"use server";

import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { proposals } from "@/lib/db/schema";
import { getDefaultContent } from "@/lib/proposals/default-content";
import { getEditorSchema, newProposalSchema } from "@/lib/validations/proposal";
import type { ProposalContent } from "@/types/proposal-content";

// ─── Slug ────────────────────────────────────────────────────────────────

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 56);
}

function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 8);
}

/** Gera um slug único para uma proposta nova. */
async function generateUniqueSlug(base: string): Promise<string> {
  const root = slugify(base) || "proposta";
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const candidate = `${root}-${randomSuffix()}`;
    const existing = await db.query.proposals.findFirst({
      where: eq(proposals.slug, candidate),
    });
    if (!existing) return candidate;
  }
  return `${root}-${Date.now().toString(36)}`;
}

// ─── Criar (passo 1 do wizard) ───────────────────────────────────────────

export interface NewProposalState {
  errors?: Record<string, string>;
  message?: string;
}

export async function createProposal(
  _prevState: NewProposalState,
  formData: FormData,
): Promise<NewProposalState> {
  const session = await auth();
  if (!session?.user) {
    return { message: "Sessão expirada. Faça login novamente." };
  }

  const parsed = newProposalSchema.safeParse({
    clientId: formData.get("clientId") ?? undefined,
    type: formData.get("type") ?? undefined,
    title: (formData.get("title") as string | null)?.trim() || undefined,
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
    }
    return { errors, message: "Confira os campos destacados." };
  }

  const { clientId, type, title } = parsed.data;
  let newId: string;

  try {
    const slug = await generateUniqueSlug(title);
    const [row] = await db
      .insert(proposals)
      .values({
        clientId,
        type,
        title,
        slug,
        status: "draft",
        content: getDefaultContent(type),
        createdBy: session.user.id,
      })
      .returning({ id: proposals.id });
    newId = row.id;
  } catch (error) {
    console.error("Falha ao criar proposta:", error);
    return { message: "Erro ao criar a proposta. Tente novamente." };
  }

  revalidatePath("/admin/proposals");
  redirect(`/admin/proposals/${newId}`);
}

// ─── Atualizar (auto-save / salvar) ──────────────────────────────────────

export interface UpdateProposalInput {
  title: string;
  slug: string;
  validUntil: string;
  content: ProposalContent;
}

export interface UpdateProposalResult {
  ok: boolean;
  error?: string;
  savedAt?: string;
}

export async function updateProposal(
  id: string,
  input: UpdateProposalInput,
): Promise<UpdateProposalResult> {
  const session = await auth();
  if (!session?.user) {
    return { ok: false, error: "Sessão expirada." };
  }

  const proposal = await db.query.proposals.findFirst({
    where: eq(proposals.id, id),
  });
  if (!proposal) {
    return { ok: false, error: "Proposta não encontrada." };
  }

  const parsed = getEditorSchema(proposal.type).safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Dados inválidos.",
    };
  }
  const data = parsed.data;

  // Slug precisa ser único entre as demais propostas.
  const slugTaken = await db.query.proposals.findFirst({
    where: and(eq(proposals.slug, data.slug), ne(proposals.id, id)),
  });
  if (slugTaken) {
    return { ok: false, error: "Esse slug já está em uso por outra proposta." };
  }

  try {
    await db
      .update(proposals)
      .set({
        title: data.title,
        slug: data.slug,
        validUntil: data.validUntil ? new Date(`${data.validUntil}T23:59:59`) : null,
        content: data.content as ProposalContent,
        updatedAt: new Date(),
      })
      .where(eq(proposals.id, id));
  } catch (error) {
    console.error("Falha ao atualizar proposta:", error);
    return { ok: false, error: "Erro ao salvar." };
  }

  revalidatePath("/admin/proposals");
  revalidatePath(`/admin/proposals/${id}`);
  return { ok: true, savedAt: new Date().toISOString() };
}

// ─── Enviar ──────────────────────────────────────────────────────────────

export async function sendProposal(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Não autenticado." };

  const proposal = await db.query.proposals.findFirst({
    where: eq(proposals.id, id),
  });
  if (!proposal) return { ok: false, error: "Proposta não encontrada." };

  try {
    await db
      .update(proposals)
      .set({
        status: proposal.status === "draft" ? "sent" : proposal.status,
        sentAt: proposal.sentAt ?? new Date(),
        updatedAt: new Date(),
      })
      .where(eq(proposals.id, id));
  } catch (error) {
    console.error("Falha ao enviar proposta:", error);
    return { ok: false, error: "Erro ao marcar como enviada." };
  }

  revalidatePath("/admin/proposals");
  revalidatePath(`/admin/proposals/${id}`);
  return { ok: true };
}

// ─── Duplicar ────────────────────────────────────────────────────────────

export async function duplicateProposal(id: string): Promise<void> {
  const session = await auth();
  if (!session?.user) return;

  const original = await db.query.proposals.findFirst({
    where: eq(proposals.id, id),
  });
  if (!original) return;

  const title = `Cópia de ${original.title}`;
  const slug = await generateUniqueSlug(title);

  const [row] = await db
    .insert(proposals)
    .values({
      clientId: original.clientId,
      type: original.type,
      title,
      slug,
      status: "draft",
      content: original.content,
      createdBy: session.user.id,
    })
    .returning({ id: proposals.id });

  revalidatePath("/admin/proposals");
  redirect(`/admin/proposals/${row.id}`);
}

// ─── Excluir ─────────────────────────────────────────────────────────────

export async function deleteProposal(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Não autenticado." };

  try {
    await db.delete(proposals).where(eq(proposals.id, id));
  } catch (error) {
    console.error("Falha ao excluir proposta:", error);
    return { ok: false, error: "Erro ao excluir a proposta." };
  }

  revalidatePath("/admin/proposals");
  return { ok: true };
}

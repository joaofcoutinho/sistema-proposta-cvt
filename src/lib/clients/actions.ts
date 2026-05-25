"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { clientFormSchema } from "@/lib/validations/client";

export interface ClientFormState {
  errors?: Record<string, string>;
  message?: string;
}

/** Lê um campo de texto do FormData, normalizando vazio para undefined. */
function field(formData: FormData, name: string): string | undefined {
  const value = formData.get(name);
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

/** Cria ou atualiza um cliente (decide pela presença do campo `id`). */
export async function saveClient(
  _prevState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const session = await auth();
  if (!session?.user) {
    return { message: "Sessão expirada. Faça login novamente." };
  }

  const id = field(formData, "id");
  const parsed = clientFormSchema.safeParse({
    companyName: field(formData, "companyName"),
    contactName: field(formData, "contactName"),
    contactRole: field(formData, "contactRole"),
    contactEmail: field(formData, "contactEmail"),
    contactPhone: field(formData, "contactPhone"),
    logoUrl: field(formData, "logoUrl"),
    primaryColor: field(formData, "primaryColor"),
    accentColor: field(formData, "accentColor"),
    themeMode: field(formData, "themeMode"),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key]) {
        errors[key] = issue.message;
      }
    }
    return { errors, message: "Confira os campos destacados." };
  }

  const data = parsed.data;
  const values = {
    companyName: data.companyName,
    contactName: data.contactName ?? null,
    contactRole: data.contactRole ?? null,
    contactEmail: data.contactEmail ?? null,
    contactPhone: data.contactPhone ?? null,
    logoUrl: data.logoUrl ?? null,
    primaryColor: data.primaryColor,
    accentColor: data.accentColor,
    themeMode: data.themeMode,
  };

  try {
    if (id) {
      await db
        .update(clients)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(clients.id, id));
    } else {
      await db
        .insert(clients)
        .values({ ...values, createdBy: session.user.id });
    }
  } catch (error) {
    console.error("Falha ao salvar cliente:", error);
    return { message: "Erro ao salvar. Tente novamente." };
  }

  revalidatePath("/admin/clients");
  redirect("/admin/clients");
}

const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;

/**
 * Atualiza identidade visual (cores, modo, logo) de um cliente.
 * Usado pelo editor de proposta pra permitir tweaks visuais sem
 * abrir o formulário completo. Afeta todas as propostas do cliente.
 */
export async function updateClientBranding(
  id: string,
  input: {
    primaryColor: string;
    accentColor: string;
    themeMode: "dark" | "light";
    logoUrl: string | null;
  },
): Promise<{ ok: boolean; error?: string }> {
  const session = await auth();
  if (!session?.user) {
    return { ok: false, error: "Não autenticado." };
  }

  if (!HEX_COLOR.test(input.primaryColor)) {
    return { ok: false, error: "Cor primária inválida (use hex #RRGGBB)." };
  }
  if (!HEX_COLOR.test(input.accentColor)) {
    return { ok: false, error: "Cor de destaque inválida (use hex #RRGGBB)." };
  }
  if (input.themeMode !== "dark" && input.themeMode !== "light") {
    return { ok: false, error: "Modo de tema inválido." };
  }

  try {
    await db
      .update(clients)
      .set({
        primaryColor: input.primaryColor.toUpperCase(),
        accentColor: input.accentColor.toUpperCase(),
        themeMode: input.themeMode,
        logoUrl: input.logoUrl,
        updatedAt: new Date(),
      })
      .where(eq(clients.id, id));
    revalidatePath("/admin/clients");
    return { ok: true };
  } catch (error) {
    console.error("Falha ao atualizar identidade do cliente:", error);
    return { ok: false, error: "Erro ao salvar. Tente novamente." };
  }
}

/** Exclui um cliente (e, em cascata, suas propostas). */
export async function deleteClient(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  const session = await auth();
  if (!session?.user) {
    return { ok: false, error: "Não autenticado." };
  }

  try {
    await db.delete(clients).where(eq(clients.id, id));
    revalidatePath("/admin/clients");
    return { ok: true };
  } catch (error) {
    console.error("Falha ao excluir cliente:", error);
    return { ok: false, error: "Falha ao excluir o cliente." };
  }
}

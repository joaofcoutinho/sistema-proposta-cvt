import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { proposalAcceptances, proposals } from "@/lib/db/schema";
import { notifyProposalAccepted } from "@/lib/email";
import { acceptanceSchema } from "@/lib/validations/proposal";

/** Registra o aceite de uma proposta. */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requisição inválida." },
      { status: 400 },
    );
  }

  const parsed = acceptanceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Dados inválidos.",
      },
      { status: 400 },
    );
  }

  const proposal = await db.query.proposals.findFirst({
    where: eq(proposals.id, id),
    with: { client: true, acceptance: true },
  });
  if (!proposal) {
    return NextResponse.json(
      { ok: false, error: "Proposta não encontrada." },
      { status: 404 },
    );
  }
  if (proposal.acceptance) {
    return NextResponse.json(
      { ok: false, error: "Esta proposta já foi aceita." },
      { status: 409 },
    );
  }
  if (proposal.validUntil && proposal.validUntil.getTime() < Date.now()) {
    return NextResponse.json(
      { ok: false, error: "Esta proposta expirou." },
      { status: 410 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = request.headers.get("user-agent") ?? null;

  await db.insert(proposalAcceptances).values({
    proposalId: id,
    acceptedByName: parsed.data.name,
    acceptedByRole: parsed.data.role ?? null,
    ip,
    userAgent,
  });

  await db
    .update(proposals)
    .set({ status: "accepted", acceptedAt: new Date() })
    .where(eq(proposals.id, id));

  await notifyProposalAccepted(proposal, proposal.client, {
    name: parsed.data.name,
    role: parsed.data.role,
  });

  return NextResponse.json({ ok: true });
}

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { proposals, proposalViews } from "@/lib/db/schema";
import { notifyProposalViewed } from "@/lib/email";

/** Registra uma visualização da proposta pública. */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const proposal = await db.query.proposals.findFirst({
    where: eq(proposals.slug, slug),
    with: { client: true },
  });
  if (!proposal) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = request.headers.get("user-agent") ?? null;
  const referrer = request.headers.get("referer") ?? null;

  await db.insert(proposalViews).values({
    proposalId: proposal.id,
    ip,
    userAgent,
    referrer,
  });

  // Primeira visualização: marca data e atualiza status, e notifica o admin.
  if (!proposal.firstViewedAt) {
    await db
      .update(proposals)
      .set({
        firstViewedAt: new Date(),
        status: proposal.status === "sent" ? "viewed" : proposal.status,
      })
      .where(eq(proposals.id, proposal.id));

    await notifyProposalViewed(proposal, proposal.client);
  }

  return NextResponse.json({ ok: true });
}

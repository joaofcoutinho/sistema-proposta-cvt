import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProposalRenderer } from "@/components/proposals/proposal-renderer";
import { getProposalById } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Pré-visualização — Convertido",
  robots: { index: false, follow: false },
};

export default async function ProposalStandalonePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const proposal = await getProposalById(id);

  if (!proposal) {
    notFound();
  }

  const { client, ...proposalRow } = proposal;
  return <ProposalRenderer client={client} proposal={proposalRow} preview />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProposalExpired } from "@/components/proposals/proposal-expired";
import { ProposalRenderer } from "@/components/proposals/proposal-renderer";
import { ProposalViewTracker } from "@/components/proposals/proposal-view-tracker";
import { getProposalBySlug } from "@/lib/db/queries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const proposal = await getProposalBySlug(slug);
  return {
    title: proposal
      ? `${proposal.title} — Convertido`
      : "Proposta — Convertido",
    // Propostas são privadas: não indexar.
    robots: { index: false, follow: false },
  };
}

export default async function PublicProposalPage({ params }: PageProps) {
  const { slug } = await params;
  const proposal = await getProposalBySlug(slug);

  if (!proposal) {
    notFound();
  }

  const { client, ...proposalRow } = proposal;

  const isExpired =
    proposalRow.status === "expired" ||
    (proposalRow.validUntil
      ? proposalRow.validUntil.getTime() < Date.now()
      : false);

  if (isExpired) {
    return <ProposalExpired client={client} />;
  }

  return (
    <>
      <ProposalViewTracker slug={slug} />
      <ProposalRenderer client={client} proposal={proposalRow} />
    </>
  );
}

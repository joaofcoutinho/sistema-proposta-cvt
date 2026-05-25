import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProposalEditor } from "@/components/admin/proposal-editor/proposal-editor";
import { getProposalById } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Editar proposta — Convertido",
};

export default async function ProposalEditorPage({
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
  return <ProposalEditor proposal={proposalRow} client={client} />;
}

import type { Client, Proposal } from "@/lib/db/schema";

/** Props comuns a todos os templates de proposta. */
export interface ProposalTemplateProps {
  client: Client;
  proposal: Proposal;
  /** Em modo preview o formulário de aceite não envia de verdade. */
  preview?: boolean;
}

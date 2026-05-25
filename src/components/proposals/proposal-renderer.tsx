import { CampanhaTemplate } from "./campanha-template";
import { EcommerceTemplate } from "./ecommerce-template";
import { ProposalTheme } from "./proposal-theme";
import type { ProposalTemplateProps } from "./template-props";
import { TrafegoTemplate } from "./trafego-template";
import { WebsiteTemplate } from "./website-template";

function TemplateByType({ client, proposal, preview }: ProposalTemplateProps) {
  switch (proposal.type) {
    case "website":
      return <WebsiteTemplate client={client} proposal={proposal} preview={preview} />;
    case "ecommerce":
      return <EcommerceTemplate client={client} proposal={proposal} preview={preview} />;
    case "trafego":
      return <TrafegoTemplate client={client} proposal={proposal} preview={preview} />;
    case "campanha":
      return <CampanhaTemplate client={client} proposal={proposal} preview={preview} />;
  }
}

/**
 * Renderiza uma proposta completa: aplica o tema do cliente e seleciona o
 * template pelo tipo. Usado pela página pública e pelo preview do admin.
 */
export function ProposalRenderer({
  client,
  proposal,
  preview = false,
}: ProposalTemplateProps) {
  return (
    <ProposalTheme
      primaryColor={client.primaryColor}
      accentColor={client.accentColor}
      mode={client.themeMode}
    >
      <TemplateByType client={client} proposal={proposal} preview={preview} />
    </ProposalTheme>
  );
}

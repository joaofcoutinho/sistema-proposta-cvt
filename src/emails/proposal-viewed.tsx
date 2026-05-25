import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import * as s from "./styles";

const LOGO_URL = `${process.env.NEXT_PUBLIC_PUBLIC_URL ?? "http://localhost:3000"}/convertido-logo.png`;

interface ProposalViewedEmailProps {
  proposalTitle: string;
  clientName: string;
  proposalUrl: string;
}

/** E-mail enviado ao admin quando uma proposta é vista pela primeira vez. */
export function ProposalViewedEmail({
  proposalTitle,
  clientName,
  proposalUrl,
}: ProposalViewedEmailProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>{`A proposta "${proposalTitle}" foi visualizada`}</Preview>
      <Body style={s.body}>
        <Container style={s.container}>
          <Section style={s.brandRow}>
            <Img
              src={LOGO_URL}
              alt="Convertido"
              width={32}
              height={32}
              style={s.brandLogo}
            />
            <Text style={s.brandText}>Convertido</Text>
          </Section>
          <Heading style={s.heading}>Proposta visualizada 👀</Heading>
          <Text style={s.text}>
            A proposta <span style={s.strong}>{proposalTitle}</span>, enviada
            para <span style={s.strong}>{clientName}</span>, foi aberta pela
            primeira vez.
          </Text>
          <Link href={proposalUrl} style={s.button}>
            Abrir proposta
          </Link>
          <Text style={s.footer}>
            Convertido Marketing · Sistema de Propostas
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ProposalViewedEmail;

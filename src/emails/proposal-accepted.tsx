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

interface ProposalAcceptedEmailProps {
  recipient: "admin" | "client";
  proposalTitle: string;
  clientName: string;
  acceptedByName: string;
  acceptedByRole?: string;
  proposalUrl: string;
}

/** E-mail de confirmação de aceite — versões para o admin e para o cliente. */
export function ProposalAcceptedEmail({
  recipient,
  proposalTitle,
  clientName,
  acceptedByName,
  acceptedByRole,
  proposalUrl,
}: ProposalAcceptedEmailProps) {
  const isAdmin = recipient === "admin";
  const signer = acceptedByRole
    ? `${acceptedByName} (${acceptedByRole})`
    : acceptedByName;

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>{`Proposta "${proposalTitle}" aceita`}</Preview>
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
          <Heading style={s.heading}>
            {isAdmin ? "Proposta aceita! ✅" : "Aceite confirmado ✅"}
          </Heading>

          {isAdmin ? (
            <Text style={s.text}>
              A proposta <span style={s.strong}>{proposalTitle}</span> foi
              aceita por <span style={s.strong}>{signer}</span> em nome de{" "}
              <span style={s.strong}>{clientName}</span>.
            </Text>
          ) : (
            <Text style={s.text}>
              Olá! Confirmamos o aceite da proposta{" "}
              <span style={s.strong}>{proposalTitle}</span>. Obrigado pela
              confiança — a equipe Convertido entrará em contato em breve para
              os próximos passos.
            </Text>
          )}

          <div style={s.infoBox}>
            <Text style={{ ...s.text, margin: 0 }}>
              Aceito por: <span style={s.strong}>{signer}</span>
            </Text>
          </div>

          <Link href={proposalUrl} style={s.button}>
            Ver proposta
          </Link>
          <Text style={s.footer}>
            Convertido Marketing · Sistema de Propostas
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ProposalAcceptedEmail;

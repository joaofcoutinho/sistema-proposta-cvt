import { Resend } from "resend";

import { ProposalAcceptedEmail } from "@/emails/proposal-accepted";
import { ProposalViewedEmail } from "@/emails/proposal-viewed";
import type { Client, Proposal } from "@/lib/db/schema";

/**
 * Helpers de e-mail transacional (Resend + React Email).
 *
 * Se RESEND_API_KEY não estiver configurada, as notificações são ignoradas
 * silenciosamente — o app continua funcionando sem e-mail.
 */

let resendInstance: Resend | null | undefined;

function getResend(): Resend | null {
  if (resendInstance === undefined) {
    const apiKey = process.env.RESEND_API_KEY;
    resendInstance = apiKey ? new Resend(apiKey) : null;
  }
  return resendInstance;
}

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "propostas@convertido.com.br";
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL;

function publicProposalUrl(slug: string): string {
  const base =
    process.env.NEXT_PUBLIC_PUBLIC_URL ?? "http://localhost:3000";
  return `${base}/p/${slug}`;
}

/** Notifica o admin quando uma proposta é vista pela primeira vez. */
export async function notifyProposalViewed(
  proposal: Proposal,
  client: Client,
): Promise<void> {
  const resend = getResend();
  if (!resend || !ADMIN_EMAIL) {
    console.info("[email] Resend não configurado — notificação de view ignorada.");
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `👀 Proposta visualizada — ${proposal.title}`,
      react: ProposalViewedEmail({
        proposalTitle: proposal.title,
        clientName: client.companyName,
        proposalUrl: publicProposalUrl(proposal.slug),
      }),
    });
  } catch (error) {
    console.error("[email] Falha ao notificar visualização:", error);
  }
}

/** Notifica admin e cliente quando uma proposta é aceita. */
export async function notifyProposalAccepted(
  proposal: Proposal,
  client: Client,
  acceptedBy: { name: string; role?: string },
): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.info("[email] Resend não configurado — notificação de aceite ignorada.");
    return;
  }

  const proposalUrl = publicProposalUrl(proposal.slug);

  try {
    if (ADMIN_EMAIL) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `✅ Proposta aceita — ${proposal.title}`,
        react: ProposalAcceptedEmail({
          recipient: "admin",
          proposalTitle: proposal.title,
          clientName: client.companyName,
          acceptedByName: acceptedBy.name,
          acceptedByRole: acceptedBy.role,
          proposalUrl,
        }),
      });
    }

    if (client.contactEmail) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: client.contactEmail,
        subject: `Confirmação de aceite — ${proposal.title}`,
        react: ProposalAcceptedEmail({
          recipient: "client",
          proposalTitle: proposal.title,
          clientName: client.companyName,
          acceptedByName: acceptedBy.name,
          acceptedByRole: acceptedBy.role,
          proposalUrl,
        }),
      });
    }
  } catch (error) {
    console.error("[email] Falha ao notificar aceite:", error);
  }
}

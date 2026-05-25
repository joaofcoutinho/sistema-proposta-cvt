import type { Proposal } from "@/lib/db/schema";
import type { ProposalType } from "@/types/proposal-content";

export type ProposalStatus = Proposal["status"];

interface StatusMeta {
  label: string;
  /** Classes Tailwind para o badge */
  className: string;
}

export const PROPOSAL_STATUS_META: Record<ProposalStatus, StatusMeta> = {
  draft: {
    label: "Rascunho",
    className: "border-border bg-surface text-muted-foreground",
  },
  sent: {
    label: "Enviada",
    className: "border-primary/30 bg-primary/15 text-primary-soft",
  },
  viewed: {
    label: "Visualizada",
    className: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
  accepted: {
    label: "Aceita",
    className: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  },
  rejected: {
    label: "Recusada",
    className: "border-destructive/30 bg-destructive/10 text-destructive",
  },
  expired: {
    label: "Expirada",
    className: "border-border bg-surface text-muted-foreground/70",
  },
};

export const PROPOSAL_STATUSES = Object.keys(
  PROPOSAL_STATUS_META,
) as ProposalStatus[];

export const PROPOSAL_TYPE_LABELS: Record<ProposalType, string> = {
  website: "Website",
  ecommerce: "E-commerce",
  trafego: "Tráfego Pago",
  campanha: "Campanha",
};

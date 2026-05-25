import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProposalRenderer } from "@/components/proposals/proposal-renderer";
import { cn } from "@/lib/utils";
import { getMockProposal } from "@/lib/proposals/mock-content";
import type { ProposalType } from "@/types/proposal-content";

const TYPE_LABELS: Record<ProposalType, string> = {
  website: "Website",
  ecommerce: "E-commerce",
  trafego: "Tráfego Pago",
  campanha: "Campanha",
};

const VALID_TYPES = Object.keys(TYPE_LABELS) as ProposalType[];

function isProposalType(value: string): value is ProposalType {
  return (VALID_TYPES as string[]).includes(value);
}

export const metadata: Metadata = {
  title: "Preview de template — Convertido",
};

/** Barra de navegação entre os previews (chrome do admin). */
function PreviewToolbar({ active }: { active: ProposalType }) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border bg-background px-4 py-2.5">
      <span className="mr-1 text-xs text-muted-foreground">
        Preview de template
      </span>
      {VALID_TYPES.map((type) => (
        <Link
          key={type}
          href={`/admin/preview/${type}`}
          className={cn(
            "rounded-md px-3 py-1 text-xs font-medium transition-colors",
            type === active
              ? "bg-primary text-primary-foreground"
              : "bg-surface text-muted-foreground hover:text-foreground",
          )}
        >
          {TYPE_LABELS[type]}
        </Link>
      ))}
      <Link
        href="/admin"
        className="ml-auto text-xs text-muted-foreground hover:text-foreground"
      >
        ← Voltar ao admin
      </Link>
    </div>
  );
}

export default async function ProposalPreviewPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!isProposalType(type)) {
    notFound();
  }

  const { client, proposal } = getMockProposal(type);

  return (
    <div className="min-h-svh bg-background">
      <PreviewToolbar active={type} />
      <ProposalRenderer client={client} proposal={proposal} preview />
    </div>
  );
}

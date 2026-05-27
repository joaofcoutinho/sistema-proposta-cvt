interface ProposalTopbarProps {
  logoUrl?: string | null;
  companyName: string;
  badge: string;
}

/** Barra fixa no topo da proposta: logo do cliente + badge. */
export function ProposalTopbar({
  logoUrl,
  companyName,
  badge,
}: ProposalTopbarProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-border bg-background/80 px-4 py-2.5 backdrop-blur-xl sm:px-8 sm:py-3">
      <div className="flex min-w-0 items-center">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- logo do cliente, dimensões arbitrárias
          <img
            src={logoUrl}
            alt={companyName}
            className="h-8 w-auto object-contain sm:h-11"
          />
        ) : (
          <span className="truncate text-[15px] font-semibold tracking-tight text-foreground sm:text-lg">
            {companyName}
          </span>
        )}
      </div>
      <span className="eyebrow shrink-0 rounded-full border border-border-strong bg-surface px-2.5 py-1 text-[10px] text-muted-foreground sm:px-3 sm:py-1.5 sm:text-[11px]">
        {badge}
      </span>
    </header>
  );
}

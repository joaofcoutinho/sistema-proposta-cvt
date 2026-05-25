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
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-5 py-3 backdrop-blur-xl sm:px-8">
      <div className="flex items-center">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- logo do cliente, dimensões arbitrárias
          <img
            src={logoUrl}
            alt={companyName}
            className="h-9 w-auto object-contain sm:h-11"
          />
        ) : (
          <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
            {companyName}
          </span>
        )}
      </div>
      <span className="eyebrow rounded-full border border-border-strong bg-surface px-3 py-1.5 text-muted-foreground">
        {badge}
      </span>
    </header>
  );
}

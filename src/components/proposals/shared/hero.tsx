import type { ReactNode } from "react";

import { ProposalIcon } from "./proposal-icon";

interface ProposalHeroProps {
  tag: string;
  /** Ícone Tabler opcional ao lado da tag */
  tagIcon?: string;
  /** Linha de contato (ex.: "A/C Felipe Batista · Cruzada Material") */
  clientLine?: string;
  title: string;
  subtitle: string;
  /** Conteúdo abaixo do subtítulo: pílula de preço, chips, etc. */
  children?: ReactNode;
}

/** Hero centralizado das propostas — tag, título e subtítulo. */
export function ProposalHero({
  tag,
  tagIcon,
  clientLine,
  title,
  subtitle,
  children,
}: ProposalHeroProps) {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-18 text-center sm:pt-28 sm:pb-22">
      {/* atmosfera ambiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-48 mx-auto h-[520px] w-[800px] max-w-[96vw] rounded-full bg-primary/14 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] [background-size:64px_64px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center">
        <span className="eyebrow mb-7 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-primary-soft backdrop-blur">
          {tagIcon ? <ProposalIcon name={tagIcon} className="size-3.5" /> : null}
          {tag}
        </span>

        {clientLine ? (
          <p className="mb-3 text-sm text-muted-foreground">{clientLine}</p>
        ) : null}

        <h1 className="font-display text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.035em] text-balance text-foreground sm:text-[3.25rem] md:text-[4rem]">
          {title}
        </h1>

        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-pretty text-muted-foreground sm:text-[17px]">
          {subtitle}
        </p>

        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}

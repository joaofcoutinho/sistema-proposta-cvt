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
    <section className="relative overflow-hidden px-5 pt-14 pb-12 text-center sm:px-6 sm:pt-24 sm:pb-18 md:pt-28 md:pb-22">
      {/* atmosfera ambiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-[360px] w-[680px] max-w-[96vw] rounded-full bg-primary/14 blur-[100px] sm:-top-48 sm:h-[520px] sm:w-[800px] sm:blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] [background-size:48px_48px] sm:[background-size:64px_64px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center">
        <span className="eyebrow mb-5 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-primary-soft backdrop-blur sm:mb-7 sm:px-3.5 sm:py-1.5">
          {tagIcon ? <ProposalIcon name={tagIcon} className="size-3" /> : null}
          {tag}
        </span>

        {clientLine ? (
          <p className="mb-3 text-[13px] text-muted-foreground sm:text-sm">
            {clientLine}
          </p>
        ) : null}

        <h1 className="text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.025em] text-balance text-foreground sm:text-[3rem] sm:leading-[1.05] sm:tracking-[-0.035em] md:text-[4rem]">
          {title}
        </h1>

        <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-pretty text-muted-foreground sm:mt-6 sm:text-[15px] md:text-[17px]">
          {subtitle}
        </p>

        {children ? <div className="mt-7 w-full sm:mt-10">{children}</div> : null}
      </div>
    </section>
  );
}

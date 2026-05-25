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
    <section className="relative overflow-hidden px-6 pt-16 pb-14 text-center sm:pt-24 sm:pb-18">
      {/* glow sutil, único */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[460px] w-[720px] max-w-[94vw] rounded-full bg-primary/12 blur-[130px]"
      />
      {/* hairline superior */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center">
        <span className="eyebrow mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-primary-soft">
          {tagIcon ? <ProposalIcon name={tagIcon} className="size-3.5" /> : null}
          {tag}
        </span>

        {clientLine ? (
          <p className="mb-3 text-sm text-muted-foreground">{clientLine}</p>
        ) : null}

        <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-tight text-balance text-foreground sm:text-[2.75rem] md:text-[3.25rem]">
          {title}
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-[1.0625rem]">
          {subtitle}
        </p>

        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}

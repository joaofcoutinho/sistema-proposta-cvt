import type { IconCard } from "@/types/proposal-content";

import { cn } from "@/lib/utils";

import { ProposalIcon } from "./proposal-icon";

interface IconCardGridProps {
  cards: IconCard[];
  columns?: 2 | 3;
}

/** Grade de cards com ícone, título e descrição (valores, pilares, serviços). */
export function IconCardGrid({ cards, columns = 3 }: IconCardGridProps) {
  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 2
          ? "sm:grid-cols-2 sm:gap-3.5"
          : "sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3",
      )}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          className="group rounded-xl border border-border bg-surface p-4 transition-colors duration-200 hover:border-border-strong hover:bg-surface-2 sm:rounded-2xl sm:p-5"
        >
          <div className="mb-3 flex size-9 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary-soft transition-colors group-hover:bg-primary/15 sm:mb-3.5 sm:size-10">
            <ProposalIcon name={card.icon} className="size-4 sm:size-5" />
          </div>
          <p className="text-[0.9375rem] font-semibold tracking-tight text-foreground">
            {card.title}
          </p>
          <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}

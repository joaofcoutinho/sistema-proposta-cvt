import type { ChecklistItem } from "@/types/proposal-content";

import { ProposalIcon } from "./proposal-icon";

/** Lista de itens marcados (escopo, entregas, inclusos). */
export function Checklist({ items }: { items: ChecklistItem[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.text}
          className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-relaxed transition-colors hover:border-border-strong"
        >
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-emerald-400/12 text-emerald-400">
            <ProposalIcon name="IconCheck" className="size-3.5" stroke={2.5} />
          </span>
          <span className="min-w-0">
            <span className="text-foreground/90">{item.text}</span>
            {item.detail ? (
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {item.detail}
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

interface ExcludedBoxProps {
  title?: string;
  items: string[];
}

/** Box de itens fora do escopo. */
export function ExcludedBox({
  title = "Não incluído no escopo",
  items,
}: ExcludedBoxProps) {
  return (
    <div className="mt-4 rounded-xl border border-accent/20 bg-accent/[0.06] px-5 py-4">
      <p className="eyebrow mb-2.5 flex items-center gap-1.5 text-accent-soft">
        <ProposalIcon name="IconAdjustmentsHorizontal" className="size-3.5" />
        {title}
      </p>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-xs leading-relaxed text-muted-foreground"
          >
            <span aria-hidden className="text-accent-soft/60">
              —
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

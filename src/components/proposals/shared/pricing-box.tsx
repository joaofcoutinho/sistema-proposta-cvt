import type { PricingContent } from "@/types/proposal-content";

import { ProposalIcon } from "./proposal-icon";

/** Caixa de preço em destaque — usada no hero do e-commerce. */
export function PricingBox({ pricing }: { pricing: PricingContent }) {
  return (
    <div className="relative inline-block w-full max-w-sm overflow-hidden rounded-2xl border border-primary/30 bg-primary/[0.08] px-6 py-5 text-center sm:w-auto sm:px-9 sm:py-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-12 mx-auto h-24 w-40 rounded-full bg-primary/25 blur-3xl sm:-bottom-16 sm:h-32 sm:w-48"
      />
      <div className="relative">
        {pricing.label ? (
          <p className="eyebrow mb-2 text-muted-foreground">{pricing.label}</p>
        ) : null}
        <p className="text-[1.75rem] font-semibold tracking-tight text-foreground sm:text-[2.5rem]">
          {pricing.amount}
        </p>
        {pricing.installments ? (
          <p className="mt-1.5 text-[13px] text-primary-soft sm:text-sm">
            {pricing.installments}
          </p>
        ) : null}
        {pricing.note ? (
          <p className="mt-1 text-xs text-muted-foreground">{pricing.note}</p>
        ) : null}
      </div>
    </div>
  );
}

/** Pílula de preço inline — usada no hero do template de website. */
export function PricePill({ text }: { text: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-2 text-[13px] font-medium text-foreground sm:px-5 sm:py-2.5 sm:text-sm">
      <ProposalIcon
        name="IconCreditCard"
        className="size-3.5 shrink-0 text-primary-soft sm:size-4"
      />
      <span className="truncate">{text}</span>
    </span>
  );
}

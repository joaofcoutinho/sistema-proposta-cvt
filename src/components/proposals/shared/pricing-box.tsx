import type { PricingContent } from "@/types/proposal-content";

import { ProposalIcon } from "./proposal-icon";

/** Caixa de preço em destaque — usada no hero do e-commerce. */
export function PricingBox({ pricing }: { pricing: PricingContent }) {
  return (
    <div className="relative inline-block overflow-hidden rounded-2xl border border-primary/30 bg-primary/[0.08] px-9 py-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-16 mx-auto h-32 w-48 rounded-full bg-primary/25 blur-3xl"
      />
      <div className="relative">
        {pricing.label ? (
          <p className="eyebrow mb-2 text-muted-foreground">{pricing.label}</p>
        ) : null}
        <p className="font-mono text-[2rem] font-semibold tracking-tight text-foreground sm:text-[2.5rem]">
          {pricing.amount}
        </p>
        {pricing.installments ? (
          <p className="mt-1.5 font-mono text-sm text-primary-soft">
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
    <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-2.5 text-sm font-medium text-foreground">
      <ProposalIcon name="IconCreditCard" className="size-4 text-primary-soft" />
      {text}
    </span>
  );
}

import type { EcommerceContent } from "@/types/proposal-content";

import { AcceptForm } from "./accept-form";
import { Checklist, ExcludedBox } from "./shared/checklist";
import { ProposalFooter } from "./shared/footer";
import { ProposalHero } from "./shared/hero";
import { Phases } from "./shared/phases";
import { PricingBox } from "./shared/pricing-box";
import { ProposalIcon } from "./shared/proposal-icon";
import { SectionHeading } from "./shared/section-heading";
import { ProposalTopbar } from "./shared/topbar";
import type { ProposalTemplateProps } from "./template-props";

/** Ícones fixos dos 4S (Streaming, Scrolling, Search, Shopping). */
const FOUR_S_ICONS = [
  "IconVideo",
  "IconArrowsVertical",
  "IconSearch",
  "IconShoppingCart",
];

export function EcommerceTemplate({
  client,
  proposal,
  preview,
}: ProposalTemplateProps) {
  const content = proposal.content as EcommerceContent;

  const clientLine = client.contactName
    ? `A/C ${client.contactName} · ${client.companyName}`
    : client.companyName;

  return (
    <div className="min-h-svh">
      <ProposalTopbar
        logoUrl={client.logoUrl}
        companyName={client.companyName}
        badge="Proposta Comercial"
      />

      <ProposalHero
        tag={content.hero.tag}
        clientLine={clientLine}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
      >
        <div className="flex flex-col items-center gap-7">
          <div className="flex flex-wrap justify-center gap-2">
            {content.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted-foreground"
              >
                {chip}
              </span>
            ))}
          </div>
          <PricingBox pricing={content.pricing} />
        </div>
      </ProposalHero>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* 4S */}
        <section className="border-t border-border py-9 sm:py-11">
          <SectionHeading
            label="Metodologia"
            title="4S aplicados ao seu e-commerce"
          />
          <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 lg:grid-cols-4">
            {content.fourS.map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong"
              >
                <div className="flex size-10 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary-soft">
                  <ProposalIcon
                    name={FOUR_S_ICONS[index % FOUR_S_ICONS.length]}
                    className="size-5"
                  />
                </div>
                <p className="mt-3.5 text-[0.9375rem] font-semibold tracking-tight text-foreground">
                  {item.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="border-t border-border py-9 sm:py-11">
          <SectionHeading
            label="Roadmap"
            title={`Sprint de ${content.sprintDays} dias — ${content.roadmap.length} fases`}
          />
          <div className="mt-6 sm:mt-7">
            <Phases phases={content.roadmap} layout="rows" />
          </div>
        </section>

        {/* Escopo */}
        <section className="border-t border-border py-9 sm:py-11">
          <SectionHeading
            label="Escopo incluído"
            title="O que está dentro da proposta"
          />
          <div className="mt-6 sm:mt-7">
            <Checklist items={content.scopeIncluded} />
            {content.scopeExcluded.length > 0 ? (
              <ExcludedBox items={content.scopeExcluded} />
            ) : null}
          </div>
        </section>

        {/* Pagamento */}
        <section className="border-t border-border py-9 sm:py-11">
          <SectionHeading
            label="Investimento"
            title="Condições de pagamento"
          />
          <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 lg:grid-cols-4">
            {content.paymentConditions.map((installment) => (
              <div
                key={installment.label}
                className="rounded-xl border border-border bg-surface p-4 text-center transition-colors hover:border-border-strong"
              >
                <p className="eyebrow text-muted-foreground">
                  {installment.label}
                </p>
                <p className="mt-2 font-mono text-lg font-semibold text-foreground">
                  {installment.amount}
                </p>
                {installment.note ? (
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {installment.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* Aceite */}
        <div className="border-t border-border">
          <AcceptForm
            proposalId={proposal.id}
            preview={preview}
            alreadyAccepted={proposal.status === "accepted"}
            heading={content.cta.title}
            subtitle={content.cta.subtitle}
            validity={
              proposal.validUntil
                ? `Validade: até ${proposal.validUntil.toLocaleDateString("pt-BR")}`
                : undefined
            }
          />
        </div>
      </div>

      <ProposalFooter validity="Proposta válida conforme data de expiração." />
    </div>
  );
}

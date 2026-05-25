import type { CampanhaContent, PricingContent } from "@/types/proposal-content";

import { cn } from "@/lib/utils";

import { AcceptForm } from "./accept-form";
import { Checklist, ExcludedBox } from "./shared/checklist";
import { ProposalCta } from "./shared/cta-block";
import { ProposalFooter } from "./shared/footer";
import { ProposalHero } from "./shared/hero";
import { IconCardGrid } from "./shared/icon-card-grid";
import { Phases } from "./shared/phases";
import { ProposalIcon } from "./shared/proposal-icon";
import { SectionHeading } from "./shared/section-heading";
import { ProposalTopbar } from "./shared/topbar";
import type { ProposalTemplateProps } from "./template-props";

/** Card de investimento (fee de gestão ou de produção). */
function FeeCard({
  pricing,
  highlight,
}: {
  pricing: PricingContent;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        highlight
          ? "border-primary/30 bg-primary/[0.07]"
          : "border-border bg-surface",
      )}
    >
      {pricing.label ? (
        <p className="eyebrow text-primary-soft">{pricing.label}</p>
      ) : null}
      <p className="mt-2.5 font-mono text-3xl font-semibold tracking-tight text-foreground">
        {pricing.amount}
      </p>
      {pricing.installments ? (
        <p className="mt-1 font-mono text-sm text-primary-soft">
          {pricing.installments}
        </p>
      ) : null}
      {pricing.note ? (
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {pricing.note}
        </p>
      ) : null}
    </div>
  );
}

export function CampanhaTemplate({
  client,
  proposal,
  preview,
}: ProposalTemplateProps) {
  const content = proposal.content as CampanhaContent;
  const { investment } = content;

  return (
    <div className="min-h-svh">
      <ProposalTopbar
        logoUrl={client.logoUrl}
        companyName={client.companyName}
        badge="Campanha de Marketing"
      />

      <ProposalHero
        tag={content.hero.tag}
        tagIcon="IconSpeakerphone"
        title={content.hero.title}
        subtitle={content.hero.subtitle}
      />

      <div className="mx-auto max-w-3xl px-6">
        {/* Pilares */}
        <section className="border-t border-border py-11">
          <SectionHeading
            label="Como atuamos"
            title="Os pilares da campanha"
            description="Uma operação integrada que conecta estratégia, criação e mensuração em torno de um único objetivo de negócio."
          />
          <div className="mt-7">
            <IconCardGrid cards={content.pillars} columns={3} />
          </div>
        </section>

        {/* Cronograma */}
        <section className="border-t border-border py-11">
          <SectionHeading
            label="Cronograma"
            title="Plano em fases"
          />
          <div className="mt-7">
            <Phases phases={content.schedule} layout="rows" />
          </div>
        </section>

        {/* Entregas */}
        <section className="border-t border-border py-11">
          <SectionHeading
            label="Escopo"
            title="Entregas inclusas"
          />
          <div className="mt-7">
            <Checklist items={content.deliverables} />
            {content.excluded.length > 0 ? (
              <ExcludedBox items={content.excluded} />
            ) : null}
          </div>
        </section>

        {/* Investimento */}
        <section className="border-t border-border py-11">
          <SectionHeading
            label="Investimento"
            title="Como funciona o investimento"
          />
          <div className="mt-7 grid gap-3.5 sm:grid-cols-2">
            <FeeCard pricing={investment.managementFee} highlight />
            {investment.productionFee ? (
              <FeeCard pricing={investment.productionFee} />
            ) : null}
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/[0.06] px-5 py-4">
            <ProposalIcon
              name="IconSpeakerphone"
              className="mt-0.5 size-5 shrink-0 text-accent-soft"
            />
            <div>
              <p className="eyebrow text-accent-soft">
                Verba de mídia — não inclusa
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {investment.mediaBudgetNote}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border py-11">
          <ProposalCta content={content.cta} />
        </section>

        {/* Aceite */}
        <div className="border-t border-border">
          <AcceptForm
            proposalId={proposal.id}
            preview={preview}
            alreadyAccepted={proposal.status === "accepted"}
            validity={
              proposal.validUntil
                ? `Validade: até ${proposal.validUntil.toLocaleDateString("pt-BR")}`
                : undefined
            }
          />
        </div>
      </div>

      <ProposalFooter />
    </div>
  );
}

import type { DashboardData, TrafegoContent } from "@/types/proposal-content";

import { AcceptForm } from "./accept-form";
import { Checklist } from "./shared/checklist";
import { ProposalCta } from "./shared/cta-block";
import { ProposalFooter } from "./shared/footer";
import { ProposalHero } from "./shared/hero";
import { IconCardGrid } from "./shared/icon-card-grid";
import { Phases } from "./shared/phases";
import { SectionHeading } from "./shared/section-heading";
import { ProposalTopbar } from "./shared/topbar";
import type { ProposalTemplateProps } from "./template-props";

/** Dashboard mockado de acompanhamento de mídia. */
function TrafegoDashboard({ data }: { data: DashboardData }) {
  const metrics = [
    { label: "Investimento", value: data.investment },
    { label: "Receita", value: data.revenue },
    { label: "ROAS", value: data.roas },
    { label: "CAC", value: data.cac },
  ];
  const maxBar = Math.max(...data.weeklyBars.map((bar) => bar.value), 1);

  return (
    <div className="rounded-xl border border-border-strong bg-surface p-4 sm:rounded-2xl sm:p-6">
      <div className="mb-4 flex items-center gap-2 sm:mb-5">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
        </span>
        <span className="eyebrow text-emerald-300">Live · Últimos 30 dias</span>
      </div>

      {/* métricas */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-border bg-surface-2 p-3 sm:p-3.5"
          >
            <p className="eyebrow text-[10px] text-muted-foreground sm:text-[11px]">
              {metric.label}
            </p>
            <p className="mt-1.5 font-mono text-lg font-semibold tracking-tight text-foreground sm:text-2xl">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* gráfico de barras */}
      <div className="mt-4 rounded-xl border border-border bg-surface-2 p-3 sm:mt-5 sm:p-4">
        <p className="eyebrow mb-3 text-muted-foreground">Receita por semana</p>
        <div className="flex h-32 items-end gap-1.5">
          {data.weeklyBars.map((bar) => (
            <div
              key={bar.week}
              className="flex flex-1 flex-col items-center gap-1.5"
            >
              <div
                className="w-full rounded-t bg-gradient-to-t from-primary to-accent"
                style={{ height: `${Math.max((bar.value / maxBar) * 100, 4)}%` }}
              />
              <span className="text-[9px] text-muted-foreground">
                {bar.week}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* breakdown por canal */}
      <div className="mt-5 flex flex-col gap-3">
        {data.channels.map((channel) => (
          <div key={channel.name}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">
                {channel.name}
              </span>
              <span className="font-mono text-muted-foreground">
                {channel.value ?? `${channel.share}%`}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                style={{ width: `${Math.min(Math.max(channel.share, 0), 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrafegoTemplate({
  client,
  proposal,
  preview,
}: ProposalTemplateProps) {
  const content = proposal.content as TrafegoContent;

  return (
    <div className="min-h-svh">
      <ProposalTopbar
        logoUrl={client.logoUrl}
        companyName={client.companyName}
        badge="Performance · Tráfego Pago"
      />

      <ProposalHero
        tag={content.hero.tag}
        tagIcon="IconChartLine"
        title={content.hero.title}
        subtitle={content.hero.subtitle}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* 01 — Descrição do serviço */}
        <section className="border-t border-border py-9 sm:py-11">
          <SectionHeading
            index="01"
            label="Descrição do Serviço"
            title="Um time de performance plugado na sua operação"
            description="Atuamos como extensão do seu marketing, responsáveis por toda a engrenagem que transforma investimento em mídia em receita previsível."
          />
          <div className="mt-6 sm:mt-7">
            <IconCardGrid cards={content.serviceCards} columns={3} />
          </div>
        </section>

        {/* 02 — O que está incluso */}
        <section className="border-t border-border py-9 sm:py-11">
          <SectionHeading
            index="02"
            label="O que está incluso"
            title="Tudo o que acompanha a gestão"
          />
          <div className="mt-6 sm:mt-7">
            <Checklist items={content.included} />
          </div>
        </section>

        {/* 03 — Dashboard */}
        <section className="border-t border-border py-9 sm:py-11">
          <SectionHeading
            index="03"
            label="Dashboard de Acompanhamento"
            title="Sua operação de mídia, transparente e em tempo real"
            description="Painel proprietário conectado às suas contas de anúncio, GA4 e CRM. Você acompanha tudo no nível que quiser, quando quiser."
          />
          <div className="mt-6 sm:mt-7">
            <TrafegoDashboard data={content.dashboard} />
          </div>
        </section>

        {/* 04 — Investimento */}
        <section className="border-t border-border py-9 sm:py-11">
          <SectionHeading
            index="04"
            label="Investimento"
            title="Um modelo que cresce com o seu faturamento"
            description="Valor fixo acessível no início. A partir de um patamar de faturamento, você paga performance — alinhamos nossos incentivos aos seus."
          />
          <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 sm:gap-3.5">
            {content.pricingModel.map((phase, index) => (
              <div
                key={phase.title}
                className={`rounded-2xl border p-4 sm:p-5 ${
                  index === 0
                    ? "border-border bg-surface"
                    : "border-primary/30 bg-primary/[0.07]"
                }`}
              >
                <p className="eyebrow text-primary-soft">{phase.title}</p>
                <p className="mt-2.5 font-mono text-[1.5rem] font-semibold tracking-tight text-foreground sm:text-3xl">
                  {phase.value}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
            * A verba de mídia (investimento nas plataformas de anúncio) é paga
            diretamente pelo cliente e não está inclusa no fee de gestão.
          </p>
        </section>

        {/* 05 — Cronograma */}
        <section className="border-t border-border py-9 sm:py-11">
          <SectionHeading
            index="05"
            label="Cronograma"
            title="As primeiras 4 semanas"
          />
          <div className="mt-6 sm:mt-7">
            <Phases phases={content.schedule} layout="cards" />
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border py-9 sm:py-11">
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

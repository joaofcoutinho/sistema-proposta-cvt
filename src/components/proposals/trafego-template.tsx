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

      {/* gráfico de linha — tendência semanal */}
      <RevenueLineChart bars={data.weeklyBars} maxValue={maxBar} />

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

/**
 * Gráfico de linha minimalista — área sutil + curva suave + ponto final em destaque.
 * SVG escalável; usa preserveAspectRatio="none" pra esticar horizontal e
 * vector-effect="non-scaling-stroke" pra manter a espessura da linha.
 */
function RevenueLineChart({
  bars,
  maxValue,
}: {
  bars: { week: string; value: number }[];
  maxValue: number;
}) {
  if (bars.length === 0) return null;

  const W = 600;
  const H = 180;
  const PAD = { top: 14, right: 10, bottom: 6, left: 10 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const points = bars.map((bar, i) => ({
    x:
      PAD.left +
      (bars.length === 1 ? chartW / 2 : (i / (bars.length - 1)) * chartW),
    y:
      PAD.top +
      chartH -
      (Math.max(bar.value, 0) / Math.max(maxValue, 1)) * chartH,
    week: bar.week,
    value: bar.value,
  }));

  // Catmull-Rom -> cubic Bézier (curva suave que passa por todos os pontos)
  const linePath = (() => {
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  })();

  const baseY = PAD.top + chartH;
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  const areaPath = `${linePath} L ${lastPoint.x} ${baseY} L ${firstPoint.x} ${baseY} Z`;

  return (
    <div className="mt-4 rounded-xl border border-border bg-surface-2 p-4 sm:mt-5 sm:p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <p className="eyebrow text-muted-foreground">Receita por semana</p>
        <span className="text-[10px] tabular-nums text-muted-foreground/70">
          Pico em {lastPoint.week}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="h-32 w-full sm:h-40"
        role="img"
        aria-label="Gráfico de receita por semana"
      >
        <defs>
          <linearGradient id="trafegoLineArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* área sob a curva */}
        <path d={areaPath} fill="url(#trafegoLineArea)" />

        {/* linha principal */}
        <path
          d={linePath}
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />

        {/* ponto final com halo */}
        <circle
          cx={lastPoint.x}
          cy={lastPoint.y}
          r="9"
          fill="var(--primary)"
          opacity="0.18"
        />
        <circle
          cx={lastPoint.x}
          cy={lastPoint.y}
          r="3.5"
          fill="var(--background)"
          stroke="var(--primary)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* labels das semanas */}
      <div className="mt-2 flex justify-between px-1 text-[10px] font-medium text-muted-foreground sm:text-[11px]">
        {bars.map((b) => (
          <span key={b.week} className="text-center">
            {b.week}
          </span>
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

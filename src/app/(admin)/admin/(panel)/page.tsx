import {
  IconCheckupList,
  IconClock,
  IconEye,
  IconRosetteDiscountCheck,
  IconTrendingUp,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/admin/page-header";
import { ProposalStatusBadge } from "@/components/admin/proposal-status-badge";
import { getDashboardData } from "@/lib/db/queries";
import { PROPOSAL_STATUSES } from "@/lib/proposals/status";

export const metadata: Metadata = {
  title: "Dashboard — Convertido",
};

function MetricCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3.5 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-border-strong">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-soft">
          {icon}
        </span>
      </div>
      <div>
        <span className="font-mono text-[1.75rem] font-semibold tracking-tight text-foreground">
          {value}
        </span>
        {hint ? (
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {hint}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function formatActivityDate(date: Date): string {
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-8">
      <PageHeader
        title="Dashboard"
        description="Visão geral das propostas comerciais."
      />

      {/* Métricas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total de propostas"
          value={String(data.total)}
          icon={<IconCheckupList className="size-4" />}
        />
        <MetricCard
          label="Taxa de aceite (30d)"
          value={
            data.acceptanceRate30 === null
              ? "—"
              : `${data.acceptanceRate30}%`
          }
          hint="Propostas enviadas nos últimos 30 dias"
          icon={<IconRosetteDiscountCheck className="size-4" />}
        />
        <MetricCard
          label="Taxa de aceite (90d)"
          value={
            data.acceptanceRate90 === null
              ? "—"
              : `${data.acceptanceRate90}%`
          }
          hint="Propostas enviadas nos últimos 90 dias"
          icon={<IconTrendingUp className="size-4" />}
        />
        <MetricCard
          label="Tempo médio até aceite"
          value={
            data.avgDaysToAccept === null
              ? "—"
              : `${data.avgDaysToAccept.toFixed(1)} dias`
          }
          hint="Entre o envio e o aceite"
          icon={<IconClock className="size-4" />}
        />
      </div>

      {/* Status */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Propostas por status
        </h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {PROPOSAL_STATUSES.map((status) => (
            <Link
              key={status}
              href={`/admin/proposals?status=${status}`}
              className="flex items-center gap-2.5 rounded-xl border border-border bg-surface px-3 py-2 transition-colors hover:border-border-strong hover:bg-surface-2"
            >
              <ProposalStatusBadge status={status} />
              <span className="font-mono text-sm font-semibold text-foreground">
                {data.statusCounts[status]}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Atividade recente */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Atividade recente
        </h2>
        {data.activity.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Nenhuma atividade ainda. Envie uma proposta para começar.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-1">
            {data.activity.map((item, index) => (
              <li
                key={`${item.kind}-${index}-${item.at.getTime()}`}
                className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-foreground/[0.04]"
              >
                <span
                  className={
                    item.kind === "accept"
                      ? "flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/12 text-emerald-300"
                      : "flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-400/12 text-amber-300"
                  }
                >
                  {item.kind === "accept" ? (
                    <IconRosetteDiscountCheck className="size-4" />
                  ) : (
                    <IconEye className="size-4" />
                  )}
                </span>
                <span className="flex-1">
                  {item.kind === "accept" ? (
                    <>
                      <strong className="font-medium">{item.byName}</strong>{" "}
                      aceitou{" "}
                    </>
                  ) : (
                    "Visualização de "
                  )}
                  <Link
                    href={`/p/${item.slug}`}
                    className="font-medium text-foreground underline-offset-2 hover:underline"
                  >
                    {item.proposalTitle}
                  </Link>{" "}
                  <span className="text-muted-foreground">
                    · {item.companyName}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {formatActivityDate(item.at)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

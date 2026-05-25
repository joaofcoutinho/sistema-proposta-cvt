import { and, desc, eq, ilike, type SQL } from "drizzle-orm";

import { db } from "./index";
import {
  clients,
  proposalAcceptances,
  proposals,
  proposalViews,
} from "./schema";
import type { Proposal } from "./schema";

// ─── Clientes ────────────────────────────────────────────────────────────

/** Lista os clientes, opcionalmente filtrando pelo nome da empresa. */
export async function getClients(search?: string) {
  const term = search?.trim();
  const query = db.select().from(clients).orderBy(desc(clients.createdAt));

  if (term) {
    return query.where(ilike(clients.companyName, `%${term}%`));
  }
  return query;
}

/** Busca um cliente pelo id. */
export async function getClientById(id: string) {
  return db.query.clients.findFirst({ where: eq(clients.id, id) });
}

/** Clientes para selects (id + nome), ordenados por nome. */
export async function getClientOptions() {
  return db
    .select({ id: clients.id, companyName: clients.companyName })
    .from(clients)
    .orderBy(clients.companyName);
}

// ─── Propostas ───────────────────────────────────────────────────────────

interface ProposalFilters {
  status?: Proposal["status"];
  clientId?: string;
}

/** Lista propostas (com o cliente), aplicando filtros opcionais. */
export async function getProposals(filters: ProposalFilters = {}) {
  const conditions: SQL[] = [];
  if (filters.status) {
    conditions.push(eq(proposals.status, filters.status));
  }
  if (filters.clientId) {
    conditions.push(eq(proposals.clientId, filters.clientId));
  }

  return db.query.proposals.findMany({
    where: conditions.length ? and(...conditions) : undefined,
    orderBy: [desc(proposals.updatedAt)],
    with: {
      client: { columns: { id: true, companyName: true, logoUrl: true } },
    },
  });
}

/** Busca uma proposta pelo id, incluindo o cliente completo. */
export async function getProposalById(id: string) {
  return db.query.proposals.findFirst({
    where: eq(proposals.id, id),
    with: { client: true },
  });
}

/** Busca uma proposta pelo slug público, incluindo o cliente completo. */
export async function getProposalBySlug(slug: string) {
  return db.query.proposals.findFirst({
    where: eq(proposals.slug, slug),
    with: { client: true },
  });
}

// ─── Dashboard ───────────────────────────────────────────────────────────

export interface ActivityItem {
  kind: "view" | "accept";
  at: Date;
  proposalTitle: string;
  companyName: string;
  slug: string;
  byName?: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** Métricas e atividade recente para o dashboard. */
export async function getDashboardData() {
  const all = await db.select().from(proposals);
  const now = Date.now();

  const statusCounts: Record<Proposal["status"], number> = {
    draft: 0,
    sent: 0,
    viewed: 0,
    accepted: 0,
    rejected: 0,
    expired: 0,
  };
  for (const proposal of all) {
    statusCounts[proposal.status] += 1;
  }

  function acceptanceRate(windowDays: number): number | null {
    const since = now - windowDays * DAY_MS;
    const sent = all.filter(
      (p) => p.sentAt && p.sentAt.getTime() >= since,
    );
    if (sent.length === 0) return null;
    const accepted = sent.filter((p) => p.status === "accepted").length;
    return Math.round((accepted / sent.length) * 100);
  }

  const acceptedWithTimes = all.filter((p) => p.sentAt && p.acceptedAt);
  const avgDaysToAccept =
    acceptedWithTimes.length > 0
      ? acceptedWithTimes.reduce(
          (sum, p) =>
            sum +
            ((p.acceptedAt as Date).getTime() -
              (p.sentAt as Date).getTime()) /
              DAY_MS,
          0,
        ) / acceptedWithTimes.length
      : null;

  const recentViews = await db
    .select({
      at: proposalViews.viewedAt,
      proposalTitle: proposals.title,
      companyName: clients.companyName,
      slug: proposals.slug,
    })
    .from(proposalViews)
    .innerJoin(proposals, eq(proposalViews.proposalId, proposals.id))
    .innerJoin(clients, eq(proposals.clientId, clients.id))
    .orderBy(desc(proposalViews.viewedAt))
    .limit(8);

  const recentAccepts = await db
    .select({
      at: proposalAcceptances.acceptedAt,
      proposalTitle: proposals.title,
      companyName: clients.companyName,
      slug: proposals.slug,
      byName: proposalAcceptances.acceptedByName,
    })
    .from(proposalAcceptances)
    .innerJoin(proposals, eq(proposalAcceptances.proposalId, proposals.id))
    .innerJoin(clients, eq(proposals.clientId, clients.id))
    .orderBy(desc(proposalAcceptances.acceptedAt))
    .limit(8);

  const activity: ActivityItem[] = [
    ...recentViews.map((v) => ({ kind: "view" as const, ...v })),
    ...recentAccepts.map((a) => ({ kind: "accept" as const, ...a })),
  ]
    .sort((a, b) => b.at.getTime() - a.at.getTime())
    .slice(0, 8);

  return {
    total: all.length,
    statusCounts,
    acceptanceRate30: acceptanceRate(30),
    acceptanceRate90: acceptanceRate(90),
    avgDaysToAccept,
    activity,
  };
}

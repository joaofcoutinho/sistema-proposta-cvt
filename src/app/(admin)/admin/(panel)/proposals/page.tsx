import { IconFileText, IconPlus } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/admin/page-header";
import { ProposalsFilters } from "@/components/admin/proposals-filters";
import { ProposalsTable } from "@/components/admin/proposals-table";
import { Button } from "@/components/ui/button";
import { getClientOptions, getProposals } from "@/lib/db/queries";
import type { Proposal } from "@/lib/db/schema";
import { PROPOSAL_STATUSES } from "@/lib/proposals/status";

export const metadata: Metadata = {
  title: "Propostas — Convertido",
};

function parseStatus(value?: string): Proposal["status"] | undefined {
  return PROPOSAL_STATUSES.find((status) => status === value);
}

export default async function ProposalsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; client?: string }>;
}) {
  const { status, client } = await searchParams;

  const [proposals, clients] = await Promise.all([
    getProposals({ status: parseStatus(status), clientId: client }),
    getClientOptions(),
  ]);

  const isFiltering = Boolean(status || client);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-8">
      <PageHeader
        title="Propostas"
        description="Crie, edite e acompanhe as propostas comerciais."
      >
        <Button asChild>
          <Link href="/admin/proposals/new">
            <IconPlus className="size-4" />
            Nova proposta
          </Link>
        </Button>
      </PageHeader>

      {clients.length > 0 ? <ProposalsFilters clients={clients} /> : null}

      {proposals.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-surface text-muted-foreground">
            <IconFileText className="size-6" />
          </div>
          {isFiltering ? (
            <p className="text-sm text-muted-foreground">
              Nenhuma proposta encontrada para os filtros aplicados.
            </p>
          ) : clients.length === 0 ? (
            <>
              <p className="text-sm text-muted-foreground">
                Cadastre um cliente antes de criar propostas.
              </p>
              <Button asChild size="sm" variant="outline">
                <Link href="/admin/clients/new">Cadastrar cliente</Link>
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Você ainda não criou nenhuma proposta.
              </p>
              <Button asChild size="sm">
                <Link href="/admin/proposals/new">
                  <IconPlus className="size-4" />
                  Criar a primeira
                </Link>
              </Button>
            </>
          )}
        </div>
      ) : (
        <ProposalsTable proposals={proposals} />
      )}
    </div>
  );
}

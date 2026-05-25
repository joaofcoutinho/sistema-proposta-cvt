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
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10 sm:py-12">
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
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border-strong bg-surface/40 px-6 py-20 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary-soft">
            <IconFileText className="size-6" stroke={1.75} />
          </div>
          {isFiltering ? (
            <p className="max-w-sm text-sm text-muted-foreground">
              Nenhuma proposta encontrada para os filtros aplicados.
            </p>
          ) : clients.length === 0 ? (
            <>
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold tracking-tight text-foreground">
                  Nenhuma proposta ainda
                </p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Você precisa cadastrar um cliente antes de criar a primeira
                  proposta.
                </p>
              </div>
              <Button asChild size="sm" variant="outline" className="mt-1">
                <Link href="/admin/clients/new">Cadastrar cliente</Link>
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold tracking-tight text-foreground">
                  Nenhuma proposta criada
                </p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Escolha um cliente e um modelo pra montar a primeira proposta.
                </p>
              </div>
              <Button asChild size="sm" className="mt-1">
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

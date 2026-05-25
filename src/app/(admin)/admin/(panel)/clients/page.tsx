import { IconPlus, IconUsers } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ClientSearch } from "@/components/admin/client-search";
import { ClientsTable } from "@/components/admin/clients-table";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { getClients } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Clientes — Convertido",
};

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const clients = await getClients(q);
  const isSearching = Boolean(q?.trim());

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10 sm:py-12">
      <PageHeader
        title="Clientes"
        description="Empresas para quem você envia propostas."
      >
        <Button asChild>
          <Link href="/admin/clients/new">
            <IconPlus className="size-4" />
            Novo cliente
          </Link>
        </Button>
      </PageHeader>

      <ClientSearch defaultValue={q} />

      {clients.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border-strong bg-surface/40 px-6 py-20 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary-soft">
            <IconUsers className="size-6" stroke={1.75} />
          </div>
          {isSearching ? (
            <p className="max-w-sm text-sm text-muted-foreground">
              Nenhum cliente encontrado para{" "}
              <span className="font-mono text-foreground/80">“{q}”</span>.
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold tracking-tight text-foreground">
                  Nenhum cliente cadastrado
                </p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Comece adicionando a primeira empresa para enviar propostas.
                </p>
              </div>
              <Button asChild size="sm" className="mt-1">
                <Link href="/admin/clients/new">
                  <IconPlus className="size-4" />
                  Cadastrar o primeiro
                </Link>
              </Button>
            </>
          )}
        </div>
      ) : (
        <ClientsTable clients={clients} />
      )}
    </div>
  );
}

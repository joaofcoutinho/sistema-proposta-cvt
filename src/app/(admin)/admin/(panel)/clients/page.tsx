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
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-8">
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
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-surface text-muted-foreground">
            <IconUsers className="size-6" />
          </div>
          {isSearching ? (
            <p className="text-sm text-muted-foreground">
              Nenhum cliente encontrado para “{q}”.
            </p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Você ainda não cadastrou nenhum cliente.
              </p>
              <Button asChild size="sm">
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

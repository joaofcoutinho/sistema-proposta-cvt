import { IconUsers } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";

import { NewProposalForm } from "@/components/admin/new-proposal-form";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { getClientOptions } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Nova proposta — Convertido",
};

export default async function NewProposalPage() {
  const clients = await getClientOptions();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-10 sm:py-12">
      <PageHeader
        title="Nova proposta"
        description="Escolha o cliente e o tipo. No próximo passo você preenche o conteúdo."
      />

      {clients.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border-strong bg-surface/40 px-6 py-20 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary-soft">
            <IconUsers className="size-6" stroke={1.75} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base font-semibold tracking-tight text-foreground">
              Cadastre um cliente primeiro
            </p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Toda proposta precisa estar vinculada a uma empresa.
            </p>
          </div>
          <Button asChild size="sm" className="mt-1">
            <Link href="/admin/clients/new">Cadastrar cliente</Link>
          </Button>
        </div>
      ) : (
        <NewProposalForm clients={clients} />
      )}
    </div>
  );
}

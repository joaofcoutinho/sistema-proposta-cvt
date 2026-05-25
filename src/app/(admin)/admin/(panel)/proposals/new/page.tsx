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
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-8">
      <PageHeader
        title="Nova proposta"
        description="Escolha o cliente e o tipo. No próximo passo você preenche o conteúdo."
      />

      {clients.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-surface text-muted-foreground">
            <IconUsers className="size-6" />
          </div>
          <p className="text-sm text-muted-foreground">
            Cadastre um cliente antes de criar uma proposta.
          </p>
          <Button asChild size="sm">
            <Link href="/admin/clients/new">Cadastrar cliente</Link>
          </Button>
        </div>
      ) : (
        <NewProposalForm clients={clients} />
      )}
    </div>
  );
}

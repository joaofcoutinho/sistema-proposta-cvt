import { IconClockOff } from "@tabler/icons-react";

import type { Client } from "@/lib/db/schema";

import { ProposalTheme } from "./proposal-theme";

/** Tela exibida quando a proposta expirou. */
export function ProposalExpired({ client }: { client: Client }) {
  return (
    <ProposalTheme
      primaryColor={client.primaryColor}
      accentColor={client.accentColor}
      mode={client.themeMode}
    >
      <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <div className="flex size-16 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground">
          <IconClockOff className="size-8" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Esta proposta expirou
        </h1>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          O prazo de validade desta proposta foi encerrado. Entre em contato com
          a Convertido Marketing para receber uma versão atualizada.
        </p>
      </main>
    </ProposalTheme>
  );
}

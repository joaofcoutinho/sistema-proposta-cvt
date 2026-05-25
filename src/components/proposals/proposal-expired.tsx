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
      <main className="relative flex min-h-svh flex-col items-center justify-center gap-5 overflow-hidden px-6 py-16 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[640px] max-w-[90vw] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- logo estático */}
        <img
          src="/convertido-logo.png"
          alt="Convertido"
          className="relative size-16 object-contain"
        />
        <div className="relative flex flex-col gap-1.5">
          <p className="eyebrow text-muted-foreground">Proposta expirada</p>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Esta proposta não está mais válida
          </h1>
          <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            O prazo de validade foi encerrado. Entre em contato com a Convertido
            Marketing para receber uma versão atualizada.
          </p>
        </div>
      </main>
    </ProposalTheme>
  );
}

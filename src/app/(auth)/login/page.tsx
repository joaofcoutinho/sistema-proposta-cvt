import type { Metadata } from "next";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Entrar — Convertido Propostas",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-12">
      {/* glow ambiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[640px] max-w-[90vw] -translate-x-1/2 rounded-full bg-primary/12 blur-[130px]"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30">
            C
          </div>
          <h1 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
            Painel de propostas
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Entre com suas credenciais de administrador.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-foreground/[0.04]">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground/70">
          Convertido Marketing · Sistema interno
        </p>
      </div>
    </main>
  );
}

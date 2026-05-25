import type { Metadata } from "next";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Entrar — Convertido Propostas",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-16">
      {/* Atmosfera ambiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(closest-side_at_50%_0%,color-mix(in_oklab,var(--primary),transparent_85%)_0%,transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="relative w-full max-w-[400px]">
        <div className="mb-9 flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- logo estático */}
          <img
            src="/convertido-logo.png"
            alt="Convertido"
            className="size-14 object-contain"
          />
          <h1 className="font-display mt-6 text-[1.75rem] font-semibold tracking-[-0.025em] text-foreground">
            Bem-vindo de volta
          </h1>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Entre com suas credenciais para acessar o painel.
          </p>
        </div>

        <div className="surface-card rounded-2xl border border-border p-7 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]">
          <LoginForm />
        </div>

        <p className="mt-7 text-center text-xs text-muted-foreground/60">
          Convertido Marketing · Sistema interno
        </p>
      </div>
    </main>
  );
}

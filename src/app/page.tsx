import { IconArrowRight, IconFileText } from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-16">
      {/* glow ambiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[720px] max-w-[92vw] -translate-x-1/2 rounded-full bg-primary/12 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
      />

      <div className="relative flex max-w-xl flex-col items-center text-center">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/30">
          C
        </div>

        <span className="eyebrow mt-7 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-3.5 py-1.5 text-muted-foreground">
          <IconFileText className="size-3.5" stroke={1.75} />
          Convertido Marketing
        </span>

        <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-balance text-foreground sm:text-[3.25rem]">
          Propostas comerciais que fecham negócio
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          Gerador de propostas personalizadas por cliente — estratégia, escopo e
          investimento em uma página feita para converter.
        </p>

        <Link
          href="/admin"
          className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 active:translate-y-px"
        >
          Acessar o painel
          <IconArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            stroke={2}
          />
        </Link>
      </div>

      <p className="absolute bottom-8 text-xs text-muted-foreground/60">
        Sistema interno · convertido.com.br
      </p>
    </main>
  );
}

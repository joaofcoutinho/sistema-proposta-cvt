import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Atmosfera ambiente — radial sutil + grid muito tênue */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(closest-side_at_50%_0%,color-mix(in_oklab,var(--primary),transparent_85%)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] [background-size:64px_64px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
      />

      {/* Topbar minimal */}
      <header className="relative flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element -- logo estático */}
          <img
            src="/convertido-logo.png"
            alt="Convertido"
            className="size-8 shrink-0 object-contain"
          />
          <span className="wordmark text-[15px] text-foreground">
            Convertido
          </span>
        </span>
        <Link
          href="/admin"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Entrar →
        </Link>
      </header>

      {/* Hero */}
      <section className="relative flex flex-1 flex-col items-center justify-center px-6 py-20 text-center sm:py-28">
        <span className="eyebrow mb-8 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/70 px-3.5 py-1.5 text-muted-foreground backdrop-blur">
          <span className="size-1.5 rounded-full bg-primary" />
          Convertido Marketing · Sistema interno
        </span>

        <h1 className="font-display max-w-4xl text-[3rem] leading-[0.95] font-semibold tracking-[-0.04em] text-balance text-foreground sm:text-[4.5rem] md:text-[5.5rem]">
          Propostas que{" "}
          <span className="italic font-light text-muted-foreground">
            fecham
          </span>{" "}
          negócio.
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-[1.0625rem]">
          Gerador de propostas comerciais personalizadas por cliente —
          estratégia, escopo e investimento em uma página feita para converter.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/admin"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-[0_8px_30px_-8px_rgba(255,255,255,0.25)] transition-all hover:bg-foreground/90 active:translate-y-px"
          >
            Acessar o painel
            <IconArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              stroke={2}
            />
          </Link>
          <Link
            href="#sobre"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-6 py-3 text-sm font-medium text-foreground/80 backdrop-blur transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            Saiba mais
          </Link>
        </div>
      </section>

      {/* Rodapé */}
      <footer
        id="sobre"
        className="relative flex flex-col items-center gap-1 border-t border-border px-6 py-8 text-center sm:flex-row sm:justify-between sm:px-10"
      >
        <span className="font-mono text-xs text-muted-foreground/70">
          convertido.com.br
        </span>
        <span className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Convertido Marketing
        </span>
      </footer>
    </main>
  );
}

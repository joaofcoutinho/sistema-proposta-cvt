export default function ProposalNotFound() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center gap-5 overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[640px] max-w-[90vw] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- logo estático */}
      <img
        src="/convertido-logo.png"
        alt="Convertido"
        className="relative size-14 object-contain"
      />
      <div className="relative flex flex-col gap-1.5">
        <p className="eyebrow text-muted-foreground">404 · proposta</p>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Proposta não encontrada
        </h1>
        <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
          O link pode estar incorreto ou a proposta foi removida. Verifique com
          a Convertido Marketing.
        </p>
      </div>
    </main>
  );
}

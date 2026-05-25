export default function ProposalNotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="text-2xl font-bold text-foreground">
        Proposta não encontrada
      </h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        O link pode estar incorreto ou a proposta foi removida. Verifique com a
        Convertido Marketing.
      </p>
    </main>
  );
}

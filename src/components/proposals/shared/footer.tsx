interface ProposalFooterProps {
  /** Texto principal (ex.: "Convertido Marketing · convertido.com.br") */
  text?: string;
  /** Linha de validade da proposta */
  validity?: string;
}

/**
 * Rodapé padrão das propostas — sempre em modo escuro pra a logo branca
 * da Convertido ficar legível, independente do tema da proposta.
 */
export function ProposalFooter({
  text = "Criatividade e tecnologia integradas · convertido.com.br",
  validity,
}: ProposalFooterProps) {
  return (
    <footer className="dark mt-6 border-t border-border bg-background px-6 py-12 text-foreground">
      <div className="flex flex-col items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element -- logo estático */}
        <img
          src="/convertido-logo.png"
          alt="Convertido"
          className="h-10 w-auto object-contain"
        />
        <p className="text-xs text-muted-foreground">{text}</p>
        {validity ? (
          <p className="font-mono text-[11px] text-muted-foreground/60">
            {validity}
          </p>
        ) : null}
      </div>
    </footer>
  );
}

interface ProposalFooterProps {
  /** Texto principal (ex.: "Convertido Marketing · convertido.com.br") */
  text?: string;
  /** Linha de validade da proposta */
  validity?: string;
}

/** Rodapé padrão das propostas. */
export function ProposalFooter({
  text = "Convertido Marketing · Criatividade e tecnologia integradas · convertido.com.br",
  validity,
}: ProposalFooterProps) {
  return (
    <footer className="mt-6 border-t border-border px-6 py-10 text-center">
      <p className="text-sm font-medium tracking-tight text-foreground/80">
        Convertido
      </p>
      <p className="mt-1.5 text-xs text-muted-foreground">{text}</p>
      {validity ? (
        <p className="mt-1 text-xs text-muted-foreground/60">{validity}</p>
      ) : null}
    </footer>
  );
}

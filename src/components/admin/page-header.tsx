import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  /** Ações exibidas à direita (ex.: botão "Novo cliente") */
  children?: ReactNode;
}

/** Cabeçalho padrão das páginas do painel admin. */
export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
      <div>
        <h1 className="font-display text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] text-foreground sm:text-[2.25rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-[15px] text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

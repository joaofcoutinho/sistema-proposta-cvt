import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ProposalThemeProps {
  /** Cor primária do cliente (sobrescreve --primary) */
  primaryColor: string;
  /** Cor de destaque do cliente (sobrescreve --accent) */
  accentColor: string;
  mode: "dark" | "light";
  children: ReactNode;
  className?: string;
}

/**
 * Estabelece o contexto de tema de uma proposta. Aplica as cores do cliente
 * via CSS variables inline e o modo claro/escuro — funciona de forma
 * independente do tema do `<html>` (o painel admin é sempre escuro).
 */
export function ProposalTheme({
  primaryColor,
  accentColor,
  mode,
  children,
  className,
}: ProposalThemeProps) {
  return (
    <div
      className={cn(
        mode === "dark" ? "dark" : "theme-light",
        // Toda a proposta usa Inter Tight (mesma fonte dos h1/h2),
        // pra dar consistência editorial entre títulos e corpo.
        "font-display bg-background text-foreground",
        className,
      )}
      style={
        {
          "--primary": primaryColor,
          "--accent": accentColor,
          "--ring": primaryColor,
          // Sobrescreve --font-sans dentro da proposta também — afeta
          // inputs, botões e elementos que usam font-sans por default.
          "--font-sans": "var(--font-display)",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

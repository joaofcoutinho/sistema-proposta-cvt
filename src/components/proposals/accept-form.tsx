"use client";

import { useState, type FormEvent } from "react";

import { ProposalIcon } from "./shared/proposal-icon";

interface AcceptFormProps {
  /** Id da proposta — alvo do POST de aceite */
  proposalId: string;
  /** Em modo preview (editor/admin) o aceite não é enviado de verdade */
  preview?: boolean;
  /** A proposta já foi aceita anteriormente */
  alreadyAccepted?: boolean;
  heading?: string;
  subtitle?: string;
  validity?: string;
}

/** Formulário de aceite da proposta na página pública. */
export function AcceptForm({
  proposalId,
  preview = false,
  alreadyAccepted = false,
  heading = "Pronto para começar?",
  subtitle = "Ao aceitar, você confirma que leu e concorda com o escopo, valor e condições desta proposta.",
  validity,
}: AcceptFormProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(alreadyAccepted);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || submitting) return;

    setSubmitting(true);
    setError(null);

    if (preview) {
      window.setTimeout(() => {
        setAccepted(true);
        setSubmitting(false);
      }, 400);
      return;
    }

    try {
      const response = await fetch(`/api/proposals/${proposalId}/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), role: role.trim() }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (response.ok && data.ok) {
        setAccepted(true);
      } else {
        setError(data.error ?? "Não foi possível registrar o aceite.");
      }
    } catch {
      setError("Falha de conexão. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  if (accepted) {
    return (
      <section
        id="aceite"
        className="flex flex-col items-center gap-4 px-6 py-16 text-center"
      >
        <div className="flex size-16 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/12 text-emerald-300">
          <ProposalIcon name="IconCheck" className="size-8" stroke={2.5} />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Proposta aceita
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Confirmação registrada com sucesso. A equipe Convertido entrará em
          contato em breve.
        </p>
      </section>
    );
  }

  return (
    <section id="aceite" className="px-6 py-16 text-center">
      <h2 className="text-xl font-semibold tracking-tight text-balance text-foreground sm:text-2xl">
        {heading}
      </h2>
      <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground">
        {subtitle}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 flex max-w-sm flex-col gap-2.5"
      >
        <input
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Seu nome completo"
          aria-label="Nome completo"
          className="w-full rounded-xl border border-border-strong bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-3 focus:ring-primary/20"
        />
        <input
          type="text"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          placeholder="Cargo / empresa"
          aria-label="Cargo ou empresa"
          className="w-full rounded-xl border border-border-strong bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-3 focus:ring-primary/20"
        />

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting || !name.trim()}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          <ProposalIcon name="IconCheck" className="size-4" stroke={2.5} />
          {submitting ? "Registrando..." : "Aceitar proposta"}
        </button>
      </form>

      {validity ? (
        <p className="mt-5 font-mono text-xs text-muted-foreground">
          {validity}
        </p>
      ) : null}
    </section>
  );
}

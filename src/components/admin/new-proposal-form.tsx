"use client";

import {
  IconChartLine,
  IconLoader2,
  IconShoppingCart,
  IconSpeakerphone,
  IconWorld,
  type Icon,
} from "@tabler/icons-react";
import Link from "next/link";
import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProposal } from "@/lib/proposals/actions";
import type { ProposalType } from "@/types/proposal-content";
import { cn } from "@/lib/utils";

const TYPE_OPTIONS: {
  value: ProposalType;
  label: string;
  description: string;
  icon: Icon;
}[] = [
  {
    value: "website",
    label: "Website",
    description: "Portfólio, valores e pílula de preço.",
    icon: IconWorld,
  },
  {
    value: "ecommerce",
    label: "E-commerce",
    description: "4S, roadmap, escopo e aceite.",
    icon: IconShoppingCart,
  },
  {
    value: "trafego",
    label: "Tráfego Pago",
    description: "Dashboard, modelo de investimento.",
    icon: IconChartLine,
  },
  {
    value: "campanha",
    label: "Campanha",
    description: "Pilares, cronograma e investimento.",
    icon: IconSpeakerphone,
  },
];

interface NewProposalFormProps {
  clients: { id: string; companyName: string }[];
}

export function NewProposalForm({ clients }: NewProposalFormProps) {
  const [state, formAction, pending] = useActionState(createProposal, {});
  const [type, setType] = useState<ProposalType>("website");

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="type" value={type} />

      {state.message ? (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          {state.message}
        </p>
      ) : null}

      <section className="rounded-2xl border border-border bg-card p-6">
        <header className="mb-5 flex flex-col gap-1">
          <p className="eyebrow text-muted-foreground">Passo 1 de 2</p>
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Cliente e tipo de proposta
          </h2>
        </header>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="clientId">Cliente</Label>
            <Select name="clientId">
              <SelectTrigger id="clientId">
                <SelectValue placeholder="Selecione o cliente" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.companyName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.clientId ? (
              <p className="text-xs text-destructive">
                {state.errors.clientId}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Tipo de proposta</Label>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {TYPE_OPTIONS.map((option) => {
                const selected = option.value === type;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setType(option.value)}
                    aria-pressed={selected}
                    className={cn(
                      "group/type relative flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all",
                      selected
                        ? "border-primary/50 bg-primary/[0.07] shadow-sm shadow-primary/10"
                        : "border-border bg-surface hover:border-border-strong hover:bg-surface-2",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                        selected
                          ? "border border-primary/30 bg-primary/15 text-primary-soft"
                          : "border border-border bg-surface-2 text-muted-foreground",
                      )}
                    >
                      <option.icon className="size-4.5" stroke={1.75} />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-sm font-semibold tracking-tight text-foreground">
                        {option.label}
                      </span>
                      <span className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {option.description}
                      </span>
                    </span>
                    {selected ? (
                      <span
                        aria-hidden
                        className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-primary"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">
              Título da proposta
              <span className="text-destructive"> *</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Ex.: Proposta de Website — Cruzada"
              aria-invalid={Boolean(state.errors?.title)}
            />
            {state.errors?.title ? (
              <p className="text-xs text-destructive">{state.errors.title}</p>
            ) : null}
          </div>
        </div>
      </section>

      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="ghost" asChild>
          <Link href="/admin/proposals">Cancelar</Link>
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              <IconLoader2 className="size-4 animate-spin" /> Criando...
            </>
          ) : (
            "Criar e editar conteúdo"
          )}
        </Button>
      </div>
    </form>
  );
}

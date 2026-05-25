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

      <fieldset className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
        <legend className="px-1 text-sm font-semibold">
          Passo 1 de 2 · Cliente e tipo
        </legend>

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
            <p className="text-xs text-destructive">{state.errors.clientId}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
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
                    "flex items-start gap-3 rounded-lg border p-3 text-left transition-colors",
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/40",
                  )}
                >
                  <option.icon
                    className={cn(
                      "mt-0.5 size-5 shrink-0",
                      selected ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  <span className="flex flex-col">
                    <span className="text-sm font-medium">{option.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  </span>
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
      </fieldset>

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

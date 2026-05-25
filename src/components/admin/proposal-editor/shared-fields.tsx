"use client";

import { useController, useFormContext, useWatch } from "react-hook-form";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ArrayField,
  IconField,
  NumberField,
  StringListField,
  TextAreaField,
  TextField,
} from "./fields";

// ─── Hero ────────────────────────────────────────────────────────────────

export function HeroFields({ name }: { name: string }) {
  return (
    <div className="flex flex-col gap-4">
      <TextField name={`${name}.tag`} label="Tag (eyebrow)" />
      <TextField name={`${name}.title`} label="Título" />
      <TextAreaField name={`${name}.subtitle`} label="Subtítulo" />
    </div>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────

export function PricingFields({ name }: { name: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField name={`${name}.label`} label="Rótulo" />
      <TextField name={`${name}.amount`} label="Valor" />
      <TextField name={`${name}.installments`} label="Parcelamento" />
      <TextField name={`${name}.note`} label="Observação" />
    </div>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────

const ACTION_TYPES = [
  { value: "accept", label: "Aceitar (formulário)" },
  { value: "link", label: "Link externo" },
  { value: "whatsapp", label: "WhatsApp" },
];

function CtaActionItem({ path }: { path: string }) {
  const { control } = useFormContext();
  const { field: typeField } = useController({
    control,
    name: `${path}.type`,
  });
  const actionType = useWatch({ name: `${path}.type` });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label>Tipo de ação</Label>
        <Select
          value={typeof typeField.value === "string" ? typeField.value : "accept"}
          onValueChange={typeField.onChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ACTION_TYPES.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <TextField name={`${path}.label`} label="Texto do botão" />

      {actionType === "link" ? (
        <TextField name={`${path}.url`} label="URL" />
      ) : null}

      {actionType === "whatsapp" ? (
        <>
          <TextField
            name={`${path}.phone`}
            label="Telefone (com DDI, ex.: 5511999999999)"
          />
          <TextField name={`${path}.message`} label="Mensagem pré-preenchida" />
        </>
      ) : null}
    </div>
  );
}

export function CtaFields({ name }: { name: string }) {
  return (
    <div className="flex flex-col gap-4">
      <TextField name={`${name}.title`} label="Título do CTA" />
      <TextAreaField name={`${name}.subtitle`} label="Subtítulo do CTA" />
      <ArrayField
        name={`${name}.actions`}
        label="Botões"
        itemNoun="Botão"
        addLabel="Adicionar botão"
        newItem={() => ({ type: "accept", label: "Aceitar proposta" })}
        renderItem={(path) => <CtaActionItem path={path} />}
      />
    </div>
  );
}

// ─── Checklist ───────────────────────────────────────────────────────────

export function ChecklistField({
  name,
  label,
  addLabel,
  itemNoun = "Item",
}: {
  name: string;
  label: string;
  addLabel: string;
  itemNoun?: string;
}) {
  return (
    <ArrayField
      name={name}
      label={label}
      itemNoun={itemNoun}
      addLabel={addLabel}
      newItem={() => ({ text: "", detail: "" })}
      renderItem={(path) => (
        <div className="flex flex-col gap-3">
          <TextField name={`${path}.text`} label="Texto" />
          <TextField name={`${path}.detail`} label="Detalhe (opcional)" />
        </div>
      )}
    />
  );
}

// ─── Roadmap / cronograma ────────────────────────────────────────────────

export function RoadmapField({
  name,
  label,
  addLabel,
}: {
  name: string;
  label: string;
  addLabel: string;
}) {
  return (
    <ArrayField
      name={name}
      label={label}
      itemNoun="Fase"
      addLabel={addLabel}
      newItem={() => ({ title: "", duration: "", items: [] })}
      renderItem={(path) => (
        <div className="flex flex-col gap-3">
          <TextField name={`${path}.title`} label="Título da fase" />
          <TextField
            name={`${path}.duration`}
            label="Prazo (ex.: Dias 1–10, Semana 1)"
          />
          <StringListField name={`${path}.items`} label="Itens da fase" />
        </div>
      )}
    />
  );
}

// ─── Cards com ícone ─────────────────────────────────────────────────────

export function IconCardsField({
  name,
  label,
  addLabel,
}: {
  name: string;
  label: string;
  addLabel: string;
}) {
  return (
    <ArrayField
      name={name}
      label={label}
      itemNoun="Card"
      addLabel={addLabel}
      newItem={() => ({ icon: "IconStar", title: "", description: "" })}
      renderItem={(path) => (
        <div className="flex flex-col gap-3">
          <IconField name={`${path}.icon`} label="Ícone" />
          <TextField name={`${path}.title`} label="Título" />
          <TextAreaField name={`${path}.description`} label="Descrição" rows={2} />
        </div>
      )}
    />
  );
}

// Reexport para os forms de conteúdo.
export { NumberField, StringListField, TextAreaField, TextField };

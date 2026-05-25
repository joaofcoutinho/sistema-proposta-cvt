"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { useController, useFieldArray, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ICON_NAMES } from "@/components/proposals/shared/proposal-icon";

/** Cartão de seção do editor de conteúdo. */
export function FieldCard({
  title,
  description,
  eyebrow,
  children,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <header className="mb-4 flex flex-col gap-1">
        {eyebrow ? (
          <p className="eyebrow text-muted-foreground">{eyebrow}</p>
        ) : null}
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        {description ? (
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </header>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

export function TextField({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} placeholder={placeholder} {...register(name)} />
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  placeholder,
  rows = 3,
}: {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}) {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  );
}

export function NumberField({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type="number"
        {...register(name, { valueAsNumber: true })}
      />
    </div>
  );
}

/** Edita uma lista de strings — uma por linha em um textarea. */
export function StringListField({
  name,
  label,
  hint = "Um item por linha.",
}: {
  name: string;
  label: string;
  hint?: string;
}) {
  const { control } = useFormContext();
  const { field } = useController({ control, name });
  const items = Array.isArray(field.value) ? (field.value as string[]) : [];

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        rows={Math.max(items.length + 1, 3)}
        value={items.join("\n")}
        onChange={(event) => field.onChange(event.target.value.split("\n"))}
        onBlur={() =>
          field.onChange(items.map((item) => item).filter((item) => item.trim() !== ""))
        }
      />
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

/** Seletor de ícone Tabler. */
export function IconField({ name, label }: { name: string; label: string }) {
  const { control } = useFormContext();
  const { field } = useController({ control, name });

  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Select
        value={typeof field.value === "string" ? field.value : ""}
        onValueChange={field.onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Ícone" />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {ICON_NAMES.map((iconName) => (
            <SelectItem key={iconName} value={iconName}>
              {iconName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/** Editor de lista de objetos com adicionar/remover. */
export function ArrayField({
  name,
  label,
  itemNoun,
  addLabel,
  newItem,
  renderItem,
}: {
  name: string;
  label: string;
  itemNoun: string;
  addLabel: string;
  newItem: () => unknown;
  renderItem: (path: string, index: number) => ReactNode;
}) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold tracking-tight text-foreground">
          {label}
        </h4>
        {fields.length > 0 ? (
          <span className="font-mono text-[11px] text-muted-foreground">
            {fields.length} {fields.length === 1 ? "item" : "itens"}
          </span>
        ) : null}
      </div>

      {fields.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-surface/40 px-4 py-3 text-xs text-muted-foreground">
          Nenhum {itemNoun.toLowerCase()} ainda.
        </p>
      ) : null}

      {fields.map((fieldItem, index) => (
        <div
          key={fieldItem.id}
          className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="font-mono text-foreground/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              {itemNoun}
            </span>
            <button
              type="button"
              onClick={() => remove(index)}
              aria-label={`Remover ${itemNoun} ${index + 1}`}
              className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <IconTrash className="size-4" />
            </button>
          </div>
          {renderItem(`${name}.${index}`, index)}
        </div>
      ))}

      <button
        type="button"
        onClick={() => append(newItem())}
        className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border-strong bg-surface px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:bg-surface-2 hover:text-foreground"
      >
        <IconPlus className="size-3.5" />
        {addLabel}
      </button>
    </div>
  );
}

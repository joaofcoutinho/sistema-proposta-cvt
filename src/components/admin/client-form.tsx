"use client";

import { IconLoader2, IconUpload, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useActionState, useId, useState, type ChangeEvent } from "react";

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
import { saveClient, type ClientFormState } from "@/lib/clients/actions";
import type { Client } from "@/lib/db/schema";

interface FieldProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
}

function Field({
  label,
  name,
  error,
  required,
  defaultValue,
  type = "text",
  placeholder,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
      />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

/** Seletor de cor: swatch nativo + campo de texto sincronizados. */
function ColorField({
  label,
  name,
  value,
  onChange,
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          aria-label={`${label} — seletor`}
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000"}
          onChange={(event) => onChange(event.target.value.toUpperCase())}
          className="size-9 shrink-0 cursor-pointer rounded-md border border-border bg-transparent"
        />
        <Input
          id={id}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value.toUpperCase())}
          aria-invalid={Boolean(error)}
          className="font-mono"
          maxLength={7}
        />
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

export function ClientForm({ client }: { client?: Client }) {
  const [state, formAction, pending] = useActionState<
    ClientFormState,
    FormData
  >(saveClient, {});

  const [logoUrl, setLogoUrl] = useState(client?.logoUrl ?? "");
  const [primaryColor, setPrimaryColor] = useState(
    client?.primaryColor ?? "#6C4FE8",
  );
  const [accentColor, setAccentColor] = useState(
    client?.accentColor ?? "#C05BCC",
  );
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/upload", { method: "POST", body });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        setUploadError(data.error ?? "Falha no upload.");
      } else {
        setLogoUrl(data.url);
      }
    } catch {
      setUploadError("Falha no upload. Verifique sua conexão.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {client ? <input type="hidden" name="id" value={client.id} /> : null}
      <input type="hidden" name="logoUrl" value={logoUrl} />
      <input type="hidden" name="primaryColor" value={primaryColor} />
      <input type="hidden" name="accentColor" value={accentColor} />

      {state.message ? (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          {state.message}
        </p>
      ) : null}

      {/* Dados da empresa */}
      <fieldset className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
        <legend className="px-1 text-sm font-semibold">Empresa</legend>
        <Field
          label="Nome da empresa"
          name="companyName"
          required
          defaultValue={client?.companyName}
          error={state.errors?.companyName}
          placeholder="Ex.: Cruzada Material de Construção"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Nome do contato"
            name="contactName"
            defaultValue={client?.contactName ?? ""}
            error={state.errors?.contactName}
            placeholder="Ex.: Felipe Batista"
          />
          <Field
            label="Cargo do contato"
            name="contactRole"
            defaultValue={client?.contactRole ?? ""}
            error={state.errors?.contactRole}
            placeholder="Ex.: Diretor Comercial"
          />
          <Field
            label="E-mail"
            name="contactEmail"
            type="email"
            defaultValue={client?.contactEmail ?? ""}
            error={state.errors?.contactEmail}
            placeholder="contato@empresa.com.br"
          />
          <Field
            label="Telefone"
            name="contactPhone"
            defaultValue={client?.contactPhone ?? ""}
            error={state.errors?.contactPhone}
            placeholder="(11) 99999-9999"
          />
        </div>
      </fieldset>

      {/* Logo */}
      <fieldset className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
        <legend className="px-1 text-sm font-semibold">Logo</legend>
        <div className="flex items-center gap-4">
          <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- preview de logo
              <img
                src={logoUrl}
                alt="Logo do cliente"
                className="size-full object-contain"
              />
            ) : (
              <span className="text-xs text-muted-foreground">Sem logo</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium transition-colors hover:bg-foreground/5">
              {uploading ? (
                <IconLoader2 className="size-4 animate-spin" />
              ) : (
                <IconUpload className="size-4" />
              )}
              {uploading ? "Enviando..." : "Enviar logo"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                className="hidden"
                onChange={handleLogoChange}
                disabled={uploading}
              />
            </label>
            {logoUrl ? (
              <button
                type="button"
                onClick={() => setLogoUrl("")}
                className="inline-flex w-fit items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
              >
                <IconX className="size-3.5" /> Remover logo
              </button>
            ) : (
              <p className="text-xs text-muted-foreground">
                PNG, JPG, WEBP ou SVG · até 2 MB
              </p>
            )}
            {uploadError ? (
              <p className="text-xs text-destructive">{uploadError}</p>
            ) : null}
          </div>
        </div>
      </fieldset>

      {/* Identidade visual */}
      <fieldset className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
        <legend className="px-1 text-sm font-semibold">
          Identidade visual
        </legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <ColorField
            label="Cor primária"
            name="primaryColor"
            value={primaryColor}
            onChange={setPrimaryColor}
            error={state.errors?.primaryColor}
          />
          <ColorField
            label="Cor de destaque"
            name="accentColor"
            value={accentColor}
            onChange={setAccentColor}
            error={state.errors?.accentColor}
          />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="themeMode">Modo do tema</Label>
            <Select
              name="themeMode"
              defaultValue={client?.themeMode ?? "dark"}
            >
              <SelectTrigger id="themeMode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Escuro</SelectItem>
                <SelectItem value="light">Claro</SelectItem>
              </SelectContent>
            </Select>
            {state.errors?.themeMode ? (
              <p className="text-xs text-destructive">
                {state.errors.themeMode}
              </p>
            ) : null}
          </div>
        </div>
        <div
          className="flex items-center gap-2 rounded-lg border border-border p-3"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <span className="text-xs text-muted-foreground">Prévia:</span>
          <span
            className="size-6 rounded-md border border-white/10"
            style={{ backgroundColor: primaryColor }}
          />
          <span
            className="size-6 rounded-md border border-white/10"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      </fieldset>

      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="ghost" asChild>
          <Link href="/admin/clients">Cancelar</Link>
        </Button>
        <Button type="submit" disabled={pending || uploading}>
          {pending ? (
            <>
              <IconLoader2 className="size-4 animate-spin" /> Salvando...
            </>
          ) : client ? (
            "Salvar alterações"
          ) : (
            "Criar cliente"
          )}
        </Button>
      </div>
    </form>
  );
}

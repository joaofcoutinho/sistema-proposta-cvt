"use client";

import {
  IconArrowLeft,
  IconCheck,
  IconCopy,
  IconCopyPlus,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconExternalLink,
  IconInfoCircle,
  IconLayoutSidebarLeftExpand,
  IconLoader2,
  IconMaximize,
  IconSend,
  IconTrash,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ChangeEvent,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { ProposalRenderer } from "@/components/proposals/proposal-renderer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateClientBranding } from "@/lib/clients/actions";
import type { Client, Proposal } from "@/lib/db/schema";
import {
  deleteProposal,
  duplicateProposal,
  sendProposal,
  updateProposal,
} from "@/lib/proposals/actions";
import { PROPOSAL_STATUS_META } from "@/lib/proposals/status";
import { cn } from "@/lib/utils";
import type { ProposalContent } from "@/types/proposal-content";

import { ContentFormByType } from "./content-forms";

interface EditorValues {
  title: string;
  slug: string;
  validUntil: string;
  content: ProposalContent;
}

type SaveState = "idle" | "saving" | "saved" | "error";

const SPLIT_STORAGE_KEY = "convertido-editor-split-pct";
const DEFAULT_SPLIT_PCT = 45;
const MIN_SPLIT_PCT = 25;
const MAX_SPLIT_PCT = 75;

function toDateInput(date: Date | null): string {
  return date ? date.toISOString().slice(0, 10) : "";
}

const toolbarButton =
  "inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-foreground disabled:opacity-50";

export function ProposalEditor({
  proposal,
  client,
}: {
  proposal: Proposal;
  client: Client;
}) {
  const router = useRouter();
  const form = useForm<EditorValues>({
    defaultValues: {
      title: proposal.title,
      slug: proposal.slug,
      validUntil: toDateInput(proposal.validUntil),
      content: proposal.content,
    },
  });

  const values = useWatch({ control: form.control }) as EditorValues;
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
  const [pending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isFirstRun = useRef(true);

  // ── Split arrastável ─────────────────────────────────────────────────
  const [splitPct, setSplitPct] = useState<number>(DEFAULT_SPLIT_PCT);
  const [previewMaximized, setPreviewMaximized] = useState(false);
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  // Restaura preferência do split salva
  useEffect(() => {
    const saved = window.localStorage.getItem(SPLIT_STORAGE_KEY);
    if (!saved) return;
    const parsed = Number.parseFloat(saved);
    if (
      Number.isFinite(parsed) &&
      parsed >= MIN_SPLIT_PCT &&
      parsed <= MAX_SPLIT_PCT
    ) {
      setSplitPct(parsed);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(SPLIT_STORAGE_KEY, String(splitPct));
  }, [splitPct]);

  const handleDragStart = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  const handleDragMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const container = splitContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const pct = ((event.clientX - rect.left) / rect.width) * 100;
    setSplitPct(Math.min(MAX_SPLIT_PCT, Math.max(MIN_SPLIT_PCT, pct)));
  }, []);

  const handleDragEnd = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  const handleDragReset = useCallback(() => {
    setSplitPct(DEFAULT_SPLIT_PCT);
  }, []);

  const effectivePct = previewMaximized ? 0 : splitPct;

  // ── Identidade do cliente (cores + tema + logo) ─────────────────────
  const [branding, setBranding] = useState({
    primaryColor: client.primaryColor,
    accentColor: client.accentColor,
    themeMode: client.themeMode,
    logoUrl: client.logoUrl,
  });
  const [brandingState, setBrandingState] = useState<SaveState>("idle");
  const [brandingError, setBrandingError] = useState<string | null>(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const isFirstBrandingRun = useRef(true);

  // Debounce de salvamento da identidade visual (cliente).
  useEffect(() => {
    if (isFirstBrandingRun.current) {
      isFirstBrandingRun.current = false;
      return;
    }
    setBrandingState("saving");
    const timeout = setTimeout(async () => {
      const result = await updateClientBranding(client.id, branding);
      if (result.ok) {
        setBrandingState("saved");
        setBrandingError(null);
      } else {
        setBrandingState("error");
        setBrandingError(result.error ?? "Erro ao salvar identidade.");
        toast.error(result.error ?? "Erro ao salvar identidade.");
      }
    }, 700);
    return () => clearTimeout(timeout);
  }, [branding, client.id]);

  async function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setLogoUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/upload", { method: "POST", body });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        toast.error(data.error ?? "Falha no upload do logo.");
      } else {
        setBranding((b) => ({ ...b, logoUrl: data.url ?? null }));
      }
    } catch {
      toast.error("Falha no upload. Verifique sua conexão.");
    } finally {
      setLogoUploading(false);
    }
  }

  // Cliente com overrides aplicados — usado SÓ no preview (no banco
  // a versão "real" salva no debounce acima é a fonte de verdade).
  const previewClient = useMemo<Client>(
    () => ({
      ...client,
      primaryColor: branding.primaryColor,
      accentColor: branding.accentColor,
      themeMode: branding.themeMode,
      logoUrl: branding.logoUrl,
    }),
    [client, branding],
  );

  // ── Persist / actions ───────────────────────────────────────────────
  async function persist(): Promise<boolean> {
    const current = form.getValues();
    setSaveState("saving");
    const result = await updateProposal(proposal.id, {
      title: current.title ?? "",
      slug: current.slug ?? "",
      validUntil: current.validUntil ?? "",
      content: current.content,
    });
    if (result.ok) {
      setSaveState("saved");
      setSaveError(null);
      return true;
    }
    setSaveState("error");
    setSaveError(result.error ?? "Erro ao salvar.");
    return false;
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setSaveState("saving");
    const timeout = setTimeout(() => {
      void persist();
    }, 1200);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  function handleSend() {
    startTransition(async () => {
      if (!(await persist())) return;
      const result = await sendProposal(proposal.id);
      if (result.ok) {
        toast.success("Proposta marcada como enviada.");
        router.refresh();
      } else {
        toast.error(result.error ?? "Falha ao enviar.");
      }
    });
  }

  function handleDuplicate() {
    startTransition(async () => {
      await duplicateProposal(proposal.id);
    });
  }

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteProposal(proposal.id);
      if (result.ok) {
        toast.success("Proposta excluída.");
        router.push("/admin/proposals");
      } else {
        toast.error(result.error ?? "Falha ao excluir.");
      }
    });
  }

  function copyLink() {
    const base =
      process.env.NEXT_PUBLIC_PUBLIC_URL ?? window.location.origin;
    void navigator.clipboard
      .writeText(`${base}/p/${form.getValues("slug")}`)
      .then(() => toast.success("Link copiado."))
      .catch(() => toast.error("Não foi possível copiar."));
  }

  const previewProposal: Proposal = {
    ...proposal,
    title: values.title ?? proposal.title,
    slug: values.slug ?? proposal.slug,
    validUntil: values.validUntil ? new Date(values.validUntil) : null,
    content: values.content ?? proposal.content,
  };

  const statusMeta = PROPOSAL_STATUS_META[proposal.status];

  return (
    <FormProvider {...form}>
      <div
        className="flex flex-col"
        style={
          {
            "--toolbar-h": "52px",
            "--split-pct": effectivePct,
          } as CSSProperties
        }
      >
        {/* ── Toolbar global, sempre visível ─────────────────────── */}
        <div className="sticky top-0 z-30 flex h-[var(--toolbar-h)] flex-wrap items-center gap-2 border-b border-border bg-background/90 px-4 backdrop-blur-xl">
          <Link
            href="/admin/proposals"
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
            aria-label="Voltar para propostas"
          >
            <IconArrowLeft className="size-4" />
          </Link>
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
              statusMeta.className,
            )}
          >
            {statusMeta.label}
          </span>
          <SaveIndicator state={saveState} error={saveError} />

          <div className="ml-auto flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => startTransition(() => void persist())}
              disabled={pending}
              className={toolbarButton}
            >
              <IconCheck className="size-3.5" /> Salvar
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={pending}
              className={toolbarButton}
            >
              <IconSend className="size-3.5" /> Enviar
            </button>
            <button
              type="button"
              onClick={copyLink}
              className={toolbarButton}
            >
              <IconCopy className="size-3.5" /> Link
            </button>
            <button
              type="button"
              onClick={handleDuplicate}
              disabled={pending}
              className={toolbarButton}
            >
              <IconCopyPlus className="size-3.5" /> Duplicar
            </button>
            <Link
              href={`/admin/proposals/${proposal.id}/preview`}
              target="_blank"
              className={toolbarButton}
            >
              <IconExternalLink className="size-3.5" /> Abrir
            </Link>
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              disabled={pending}
              className={cn(
                toolbarButton,
                "hover:bg-destructive/10 hover:text-destructive",
              )}
            >
              <IconTrash className="size-3.5" /> Excluir
            </button>
          </div>
        </div>

        {/* ── Alternador mobile ───────────────────────────────────── */}
        <div className="sticky top-[var(--toolbar-h)] z-20 flex gap-1 border-b border-border bg-background/90 p-1.5 backdrop-blur-xl lg:hidden">
          {(["form", "preview"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setMobileTab(tab)}
              className={cn(
                "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                mobileTab === tab
                  ? "bg-surface text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab === "form" ? "Editar" : "Preview"}
            </button>
          ))}
        </div>

        {/* ── Split (form + handle + preview) ────────────────────── */}
        <div ref={splitContainerRef} className="relative lg:flex">
          {/* Coluna do formulário */}
          <div
            className={cn(
              "border-border lg:shrink-0 lg:border-r lg:w-[calc(var(--split-pct)*1%)]",
              mobileTab === "preview" && "hidden lg:block",
              previewMaximized && "lg:hidden",
            )}
          >
            <div className="flex flex-col gap-5 p-4 sm:p-5">
              <section className="rounded-2xl border border-border bg-card p-5">
                <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <p className="eyebrow text-muted-foreground">
                      Configurações
                    </p>
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">
                      Metadados da proposta
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {client.companyName}
                  </span>
                </header>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="title">Título da proposta</Label>
                    <Input id="title" {...form.register("title")} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="slug">Slug (URL pública)</Label>
                      <Input
                        id="slug"
                        className="font-mono"
                        {...form.register("slug")}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="validUntil">Validade</Label>
                      <Input
                        id="validUntil"
                        type="date"
                        {...form.register("validUntil")}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Identidade do cliente — cores, tema e logo */}
              <section className="rounded-2xl border border-border bg-card p-5">
                <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <p className="eyebrow text-muted-foreground">
                      Identidade do cliente
                    </p>
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">
                      Logo, cores e tema
                    </h3>
                  </div>
                  <SaveIndicator state={brandingState} error={brandingError} />
                </header>

                <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-400/20 bg-amber-400/[0.06] px-3 py-2 text-[11.5px] leading-relaxed text-amber-300/90">
                  <IconInfoCircle className="mt-0.5 size-3.5 shrink-0" />
                  <span>
                    Estas mudanças afetam{" "}
                    <strong>todas as propostas</strong> de{" "}
                    {client.companyName}.
                  </span>
                </div>

                {/* Logo */}
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface">
                    {branding.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element -- preview de logo
                      <img
                        src={branding.logoUrl}
                        alt="Logo"
                        className="size-full object-contain"
                      />
                    ) : (
                      <span className="text-[10px] text-muted-foreground/70">
                        Sem logo
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-border-strong bg-surface px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-surface-2 hover:text-foreground">
                      {logoUploading ? (
                        <IconLoader2 className="size-3.5 animate-spin" />
                      ) : (
                        <IconUpload className="size-3.5" />
                      )}
                      {logoUploading ? "Enviando..." : "Trocar logo"}
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/svg+xml"
                        className="hidden"
                        onChange={handleLogoChange}
                        disabled={logoUploading}
                      />
                    </label>
                    {branding.logoUrl ? (
                      <button
                        type="button"
                        onClick={() =>
                          setBranding((b) => ({ ...b, logoUrl: null }))
                        }
                        className="inline-flex w-fit items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <IconX className="size-3" /> Remover logo
                      </button>
                    ) : (
                      <p className="text-[11px] text-muted-foreground">
                        PNG, JPG, WEBP ou SVG · até 2 MB
                      </p>
                    )}
                  </div>
                </div>

                {/* Cores + tema */}
                <div className="grid gap-3 sm:grid-cols-3">
                  <ColorField
                    label="Cor primária"
                    value={branding.primaryColor}
                    onChange={(value) =>
                      setBranding((b) => ({ ...b, primaryColor: value }))
                    }
                  />
                  <ColorField
                    label="Cor de destaque"
                    value={branding.accentColor}
                    onChange={(value) =>
                      setBranding((b) => ({ ...b, accentColor: value }))
                    }
                  />
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="themeMode">Tema</Label>
                    <Select
                      value={branding.themeMode}
                      onValueChange={(value) =>
                        setBranding((b) => ({
                          ...b,
                          themeMode: value as "dark" | "light",
                        }))
                      }
                    >
                      <SelectTrigger id="themeMode">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="light">Claro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </section>

              <ContentFormByType type={proposal.type} />
            </div>
          </div>

          {/* Drag handle — só desktop, escondido quando preview maximizado */}
          {!previewMaximized ? (
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="Redimensionar"
              tabIndex={0}
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
              onDoubleClick={handleDragReset}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  setSplitPct((p) => Math.max(MIN_SPLIT_PCT, p - 2));
                } else if (event.key === "ArrowRight") {
                  event.preventDefault();
                  setSplitPct((p) => Math.min(MAX_SPLIT_PCT, p + 2));
                }
              }}
              className="group/handle relative hidden cursor-col-resize touch-none select-none lg:flex lg:w-1.5 lg:shrink-0 lg:items-center lg:justify-center"
              title="Arraste pra redimensionar · duplo-clique reseta"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border transition-colors group-hover/handle:bg-primary/40"
              />
              <span
                aria-hidden
                className="relative z-10 flex h-10 w-1 items-center justify-center rounded-full bg-border-strong opacity-0 transition-opacity group-hover/handle:opacity-100"
              />
            </div>
          ) : null}

          {/* Coluna do preview */}
          <div
            className={cn(
              "bg-background lg:flex-1 lg:sticky lg:top-[var(--toolbar-h)] lg:h-[calc(100svh-var(--toolbar-h))] lg:overflow-hidden",
              mobileTab === "form" && "hidden lg:block",
            )}
          >
            <div className="flex items-center justify-between gap-2 border-b border-border bg-surface/40 px-4 py-2.5">
              <span className="eyebrow flex items-center gap-2 text-muted-foreground">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                </span>
                Preview ao vivo
              </span>

              <div className="flex items-center gap-2">
                {/* Maximizar / restaurar — só desktop */}
                <button
                  type="button"
                  onClick={() => setPreviewMaximized((v) => !v)}
                  aria-label={
                    previewMaximized
                      ? "Voltar pra split (mostrar editor)"
                      : "Expandir preview"
                  }
                  title={
                    previewMaximized
                      ? "Voltar pra editar"
                      : "Expandir preview"
                  }
                  className="hidden lg:inline-flex h-7 items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 text-[11px] font-medium text-foreground/80 transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-foreground"
                >
                  {previewMaximized ? (
                    <>
                      <IconLayoutSidebarLeftExpand
                        className="size-3.5"
                        stroke={1.75}
                      />
                      Voltar pra editar
                    </>
                  ) : (
                    <>
                      <IconMaximize className="size-3.5" stroke={1.75} />
                      Expandir
                    </>
                  )}
                </button>

                {/* Device toggle */}
                <div className="flex gap-0.5 rounded-lg border border-border bg-surface p-0.5">
                  <button
                    type="button"
                    onClick={() => setDevice("desktop")}
                    aria-label="Visualização desktop"
                    className={cn(
                      "inline-flex size-7 items-center justify-center rounded-md transition-colors",
                      device === "desktop"
                        ? "bg-foreground/[0.08] text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <IconDeviceDesktop className="size-4" stroke={1.75} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDevice("mobile")}
                    aria-label="Visualização mobile"
                    className={cn(
                      "inline-flex size-7 items-center justify-center rounded-md transition-colors",
                      device === "mobile"
                        ? "bg-foreground/[0.08] text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <IconDeviceMobile className="size-4" stroke={1.75} />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-auto lg:h-[calc(100%-49px)]">
              <div
                className={cn(
                  "mx-auto transition-[max-width] duration-200",
                  device === "mobile" ? "max-w-[420px]" : "w-full",
                )}
              >
                <ProposalRenderer
                  client={previewClient}
                  proposal={previewProposal}
                  preview
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir proposta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
              disabled={pending}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {pending ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </FormProvider>
  );
}

/** Color picker compacto pra editor — swatch nativo + campo hex sincronizados. */
function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = `cf-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const safe = /^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000";
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          aria-label={`${label} — seletor`}
          value={safe}
          onChange={(event) => onChange(event.target.value.toUpperCase())}
          className="size-10 shrink-0 cursor-pointer rounded-lg border border-border bg-transparent"
        />
        <Input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value.toUpperCase())}
          className="font-mono"
          maxLength={7}
        />
      </div>
    </div>
  );
}

function SaveIndicator({
  state,
  error,
}: {
  state: SaveState;
  error: string | null;
}) {
  if (state === "saving") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <IconLoader2 className="size-3.5 animate-spin" /> Salvando...
      </span>
    );
  }
  if (state === "saved") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-emerald-400">
        <IconCheck className="size-3.5" /> Salvo
      </span>
    );
  }
  if (state === "error") {
    return (
      <span className="text-xs text-destructive">{error ?? "Erro"}</span>
    );
  }
  return null;
}

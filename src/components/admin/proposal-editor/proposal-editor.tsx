"use client";

import {
  IconArrowLeft,
  IconCheck,
  IconCopy,
  IconCopyPlus,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconExternalLink,
  IconLoader2,
  IconSend,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
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

function toDateInput(date: Date | null): string {
  return date ? date.toISOString().slice(0, 10) : "";
}

const toolbarButton =
  "inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-foreground/5 disabled:opacity-50";

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

  // Auto-save com debounce.
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
      <div className="lg:grid lg:grid-cols-2 xl:grid-cols-[minmax(440px,1fr)_1.1fr]">
        {/* ── Coluna do formulário ── */}
        <div
          className={cn(
            "border-border lg:border-r",
            mobileTab === "preview" && "hidden lg:block",
          )}
        >
          {/* Toolbar */}
          <div className="sticky top-0 z-20 flex flex-wrap items-center gap-2 border-b border-border bg-background/95 px-4 py-2.5 backdrop-blur-md">
            <Link
              href="/admin/proposals"
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
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

          {/* Alternador mobile */}
          <div className="flex gap-2 border-b border-border px-4 py-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileTab("form")}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium",
                mobileTab === "form"
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface text-muted-foreground",
              )}
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("preview")}
              className="rounded-md bg-surface px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              Preview
            </button>
          </div>

          {/* Campos */}
          <div className="flex flex-col gap-5 p-4 sm:p-5">
            <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold">Configurações</h3>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="title">Título da proposta</Label>
                <Input id="title" {...form.register("title")} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="slug">Slug (URL pública)</Label>
                  <Input id="slug" {...form.register("slug")} />
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
              <p className="text-xs text-muted-foreground">
                Cliente: {client.companyName}
              </p>
            </section>

            <ContentFormByType type={proposal.type} />
          </div>
        </div>

        {/* ── Coluna do preview ── */}
        <div
          className={cn(
            "bg-background lg:sticky lg:top-0 lg:h-svh lg:overflow-hidden",
            mobileTab === "form" && "hidden lg:block",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <span className="text-xs font-medium text-muted-foreground">
              Pré-visualização ao vivo
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setDevice("desktop")}
                aria-label="Visualização desktop"
                className={cn(
                  "inline-flex size-7 items-center justify-center rounded-md",
                  device === "desktop"
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-foreground/5",
                )}
              >
                <IconDeviceDesktop className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setDevice("mobile")}
                aria-label="Visualização mobile"
                className={cn(
                  "inline-flex size-7 items-center justify-center rounded-md",
                  device === "mobile"
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-foreground/5",
                )}
              >
                <IconDeviceMobile className="size-4" />
              </button>
            </div>
          </div>
          <div className="overflow-auto lg:h-[calc(100svh-3rem)]">
            <div
              className={cn(
                "mx-auto",
                device === "mobile" ? "max-w-[420px]" : "w-full",
              )}
            >
              <ProposalRenderer
                client={client}
                proposal={previewProposal}
                preview
              />
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

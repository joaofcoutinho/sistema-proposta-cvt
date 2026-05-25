"use client";

import {
  IconCopy,
  IconCopyPlus,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";

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
import { deleteProposal, duplicateProposal } from "@/lib/proposals/actions";

interface ProposalRowActionsProps {
  id: string;
  title: string;
  slug: string;
}

const iconButton =
  "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground";

export function ProposalRowActions({
  id,
  title,
  slug,
}: ProposalRowActionsProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function copyLink() {
    const base =
      process.env.NEXT_PUBLIC_PUBLIC_URL ?? window.location.origin;
    void navigator.clipboard
      .writeText(`${base}/p/${slug}`)
      .then(() => toast.success("Link da proposta copiado."))
      .catch(() => toast.error("Não foi possível copiar o link."));
  }

  function handleDuplicate() {
    startTransition(async () => {
      await duplicateProposal(id);
    });
  }

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteProposal(id);
      if (result.ok) {
        toast.success(`Proposta "${title}" excluída.`);
        setConfirmOpen(false);
      } else {
        toast.error(result.error ?? "Falha ao excluir.");
      }
    });
  }

  return (
    <div className="flex items-center justify-end gap-0.5">
      <Link
        href={`/admin/proposals/${id}`}
        aria-label={`Editar ${title}`}
        className={iconButton}
      >
        <IconPencil className="size-4" />
      </Link>
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copiar link"
        className={iconButton}
      >
        <IconCopy className="size-4" />
      </button>
      <button
        type="button"
        onClick={handleDuplicate}
        disabled={pending}
        aria-label="Duplicar proposta"
        className={iconButton}
      >
        <IconCopyPlus className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        disabled={pending}
        aria-label={`Excluir ${title}`}
        className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
      >
        <IconTrash className="size-4" />
      </button>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir proposta?</AlertDialogTitle>
            <AlertDialogDescription>
              Isso remove <strong>{title}</strong> e seus registros de
              visualização e aceite. Esta ação não pode ser desfeita.
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
    </div>
  );
}

"use client";

import { IconAlertTriangle, IconRefresh } from "@tabler/icons-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function PanelError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-5 px-6 py-24 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl border border-destructive/25 bg-destructive/10 text-destructive">
        <IconAlertTriangle className="size-7" stroke={1.75} />
      </div>
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Algo deu errado
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Não foi possível carregar esta página. Tente novamente em instantes.
        </p>
        {error.digest ? (
          <p className="mt-2 font-mono text-[11px] text-muted-foreground/60">
            ref: {error.digest}
          </p>
        ) : null}
      </div>
      <Button onClick={reset} className="mt-1">
        <IconRefresh className="size-4" />
        Tentar novamente
      </Button>
    </div>
  );
}

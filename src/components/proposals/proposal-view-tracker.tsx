"use client";

import { useEffect, useRef } from "react";

/** Registra uma visualização da proposta ao carregar a página pública. */
export function ProposalViewTracker({ slug }: { slug: string }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const url = `/api/track/${encodeURIComponent(slug)}`;
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(url);
    } else {
      void fetch(url, { method: "POST", keepalive: true }).catch(() => {});
    }
  }, [slug]);

  return null;
}

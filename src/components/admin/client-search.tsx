"use client";

import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";

/** Campo de busca de clientes — atualiza o query param `q` com debounce. */
export function ClientSearch({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (value.trim()) params.set("q", value.trim());
      const queryString = params.toString();
      router.replace(`/admin/clients${queryString ? `?${queryString}` : ""}`);
    }, 300);
    return () => clearTimeout(timeout);
  }, [value, router]);

  return (
    <div className="relative max-w-xs">
      <IconSearch className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Buscar por empresa..."
        className="pl-9"
        aria-label="Buscar clientes"
      />
    </div>
  );
}

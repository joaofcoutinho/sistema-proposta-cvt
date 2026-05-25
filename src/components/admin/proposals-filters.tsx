"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PROPOSAL_STATUS_META,
  PROPOSAL_STATUSES,
} from "@/lib/proposals/status";

interface ProposalsFiltersProps {
  clients: { id: string; companyName: string }[];
}

export function ProposalsFilters({ clients }: ProposalsFiltersProps) {
  const router = useRouter();
  const params = useSearchParams();

  const status = params.get("status") ?? "all";
  const clientId = params.get("client") ?? "all";

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === "all") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    const queryString = next.toString();
    router.replace(`/admin/proposals${queryString ? `?${queryString}` : ""}`);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Select value={status} onValueChange={(value) => update("status", value)}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os status</SelectItem>
          {PROPOSAL_STATUSES.map((value) => (
            <SelectItem key={value} value={value}>
              {PROPOSAL_STATUS_META[value].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={clientId}
        onValueChange={(value) => update("client", value)}
      >
        <SelectTrigger className="w-56">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os clientes</SelectItem>
          {clients.map((client) => (
            <SelectItem key={client.id} value={client.id}>
              {client.companyName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

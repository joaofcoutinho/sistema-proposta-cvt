import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Client } from "@/lib/db/schema";

import { DeleteClientButton } from "./delete-client-button";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ClientsTable({ clients }: { clients: Client[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Empresa</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead className="hidden md:table-cell">
              E-mail / Telefone
            </TableHead>
            <TableHead>Tema</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface text-[11px] font-semibold tracking-tight text-muted-foreground">
                    {client.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element -- logo do cliente
                      <img
                        src={client.logoUrl}
                        alt=""
                        className="size-full object-contain"
                      />
                    ) : (
                      initials(client.companyName)
                    )}
                  </div>
                  <span className="font-medium tracking-tight text-foreground">
                    {client.companyName}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {client.contactName ? (
                  <div className="flex flex-col">
                    <span className="text-sm">{client.contactName}</span>
                    {client.contactRole ? (
                      <span className="text-xs text-muted-foreground">
                        {client.contactRole}
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-col text-sm">
                  <span>{client.contactEmail ?? "—"}</span>
                  {client.contactPhone ? (
                    <span className="text-xs text-muted-foreground">
                      {client.contactPhone}
                    </span>
                  ) : null}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <span
                      className="size-5 rounded-md border border-white/15 shadow-sm"
                      style={{ backgroundColor: client.primaryColor }}
                      title={`Primária ${client.primaryColor}`}
                    />
                    <span
                      className="size-5 rounded-md border border-white/15 shadow-sm"
                      style={{ backgroundColor: client.accentColor }}
                      title={`Destaque ${client.accentColor}`}
                    />
                  </div>
                  <Badge
                    variant="secondary"
                    className="font-mono text-[10px] tracking-wide"
                  >
                    {client.themeMode === "dark" ? "Escuro" : "Claro"}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/admin/clients/${client.id}`}
                    aria-label={`Editar ${client.companyName}`}
                    className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                  >
                    <IconPencil className="size-4" />
                  </Link>
                  <DeleteClientButton
                    id={client.id}
                    companyName={client.companyName}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

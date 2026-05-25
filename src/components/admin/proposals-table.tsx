import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { getProposals } from "@/lib/db/queries";
import { PROPOSAL_TYPE_LABELS } from "@/lib/proposals/status";

import { ProposalRowActions } from "./proposal-row-actions";
import { ProposalStatusBadge } from "./proposal-status-badge";

type ProposalRow = Awaited<ReturnType<typeof getProposals>>[number];

function formatDate(date: Date | null): string {
  return date ? date.toLocaleDateString("pt-BR") : "—";
}

export function ProposalsTable({ proposals }: { proposals: ProposalRow[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Proposta</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Validade</TableHead>
            <TableHead className="hidden md:table-cell">Atualizada</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{proposal.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {PROPOSAL_TYPE_LABELS[proposal.type]}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-sm">
                {proposal.client.companyName}
              </TableCell>
              <TableCell>
                <ProposalStatusBadge status={proposal.status} />
              </TableCell>
              <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                {formatDate(proposal.validUntil)}
              </TableCell>
              <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                {formatDate(proposal.updatedAt)}
              </TableCell>
              <TableCell>
                <ProposalRowActions
                  id={proposal.id}
                  title={proposal.title}
                  slug={proposal.slug}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

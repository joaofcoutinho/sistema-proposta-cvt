import { PROPOSAL_STATUS_META, type ProposalStatus } from "@/lib/proposals/status";
import { cn } from "@/lib/utils";

export function ProposalStatusBadge({ status }: { status: ProposalStatus }) {
  const meta = PROPOSAL_STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        meta.className,
      )}
    >
      {meta.label}
    </span>
  );
}

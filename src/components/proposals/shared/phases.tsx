import type { RoadmapPhase } from "@/types/proposal-content";

interface PhasesProps {
  phases: RoadmapPhase[];
  /** "rows": lista numerada vertical · "cards": grade de cards */
  layout?: "rows" | "cards";
}

/** Roadmap / cronograma em fases. */
export function Phases({ phases, layout = "rows" }: PhasesProps) {
  if (layout === "cards") {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {phases.map((phase, index) => (
          <div
            key={phase.title}
            className="rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-foreground/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] text-primary-soft">
                {phase.duration}
              </span>
            </div>
            <p className="mt-2.5 text-sm font-semibold tracking-tight text-foreground">
              {phase.title}
            </p>
            {phase.items.length > 0 ? (
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {phase.items.join(" · ")}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {phases.map((phase, index) => (
        <div
          key={phase.title}
          className="flex gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-border-strong sm:p-5"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 font-mono text-sm font-semibold text-primary-soft">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold tracking-tight text-foreground">
                {phase.title}
              </p>
              <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] whitespace-nowrap text-primary-soft">
                {phase.duration}
              </span>
            </div>
            {phase.items.length > 0 ? (
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {phase.items.join(" · ")}
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

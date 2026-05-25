export default function PanelLoading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 sm:px-10 sm:py-12">
      {/* PageHeader skeleton */}
      <div className="flex items-end justify-between border-b border-border pb-5">
        <div className="flex flex-col gap-2">
          <div className="h-7 w-44 animate-pulse rounded-lg bg-surface-2" />
          <div className="h-3.5 w-64 animate-pulse rounded bg-surface" />
        </div>
        <div className="h-9 w-32 animate-pulse rounded-lg bg-surface-2" />
      </div>

      {/* Métricas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="flex flex-col gap-3.5 rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between">
              <div className="h-3 w-24 animate-pulse rounded bg-surface-2" />
              <div className="size-8 animate-pulse rounded-lg bg-surface-2" />
            </div>
            <div className="h-7 w-16 animate-pulse rounded-lg bg-surface-2" />
          </div>
        ))}
      </div>

      {/* Bloco grande */}
      <div className="h-56 animate-pulse rounded-2xl border border-border bg-card" />
    </div>
  );
}

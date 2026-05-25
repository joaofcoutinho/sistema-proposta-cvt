export default function PanelLoading() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-8">
      <div className="h-8 w-52 animate-pulse rounded-lg bg-surface" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="h-24 animate-pulse rounded-xl bg-surface"
          />
        ))}
      </div>
      <div className="h-56 animate-pulse rounded-xl bg-surface" />
    </div>
  );
}

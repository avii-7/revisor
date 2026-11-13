export default function DashboardSkeleton() {
  return (
    <>
      <div role="status" className="sr-only">Loading dashboard...</div>
      <div aria-busy="true" aria-hidden="true" className="motion-safe:animate-pulse">
        <div className="rounded-3xl border border-outline/20 bg-surface-container/40 p-8 md:p-12">
          <div className="h-6 w-32 rounded-full bg-surface-container-high" />
          <div className="mt-6 h-12 w-3/4 max-w-md rounded-lg bg-surface-container-high" />
          <div className="mt-4 h-5 w-full max-w-lg rounded bg-surface-container-high" />
          <div className="mt-3 h-5 w-2/3 max-w-sm rounded bg-surface-container-high" />
          <div className="mt-8 h-12 w-36 rounded-xl bg-surface-container-high" />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="rounded-lg border border-outline-variant/70 bg-surface-container-low p-6">
              <div className="h-4 w-1/2 rounded bg-surface-container-high" />
              <div className="mt-3 h-8 w-20 rounded bg-surface-container-high" />
            </div>
          ))}
        </div>

        <div className="mt-9 flex items-center justify-between gap-4">
          <div className="h-4 w-32 rounded bg-surface-container-high" />
          <div className="h-4 w-20 rounded bg-surface-container-high" />
        </div>
        <div className="mt-4 space-y-5">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="rounded-2xl border border-outline-variant/35 bg-surface-container-low p-6">
              <div className="h-6 w-2/3 max-w-sm rounded bg-surface-container-high" />
              <div className="mt-4 h-4 w-1/2 rounded bg-surface-container-high" />
              <div className="mt-5 flex gap-3">
                <div className="h-6 w-20 rounded-full bg-surface-container-high" />
                <div className="h-6 w-24 rounded-full bg-surface-container-high" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import DotGridBackground from "../../common/DotGridBackground.tsx";
import Header from "../../common/Header.tsx";

interface RevisionSessionSkeletonProps {
  onExit: () => void;
}

export default function RevisionSessionSkeleton({ onExit }: RevisionSessionSkeletonProps) {
  return (
    <main className="min-h-screen bg-app-gradient relative font-primary text-on-surface flex flex-col overflow-x-hidden">
      <DotGridBackground />
      <Header onLogoClick={onExit} />

      <div role="status" className="sr-only">Loading revision session...</div>
      <div aria-busy="true" aria-label="Revision session" className="flex-1 flex flex-col justify-center items-center relative z-10 px-5 py-8">
        <div aria-hidden="true" className="w-full max-w-[800px] flex flex-col items-center motion-safe:animate-pulse">
          <div className="h-5 w-28 rounded bg-surface-container-high" />
          <div className="mt-5 h-9 w-3/4 max-w-md rounded-lg bg-surface-container-high" />

          <div className="mt-8 w-full rounded-2xl border border-outline-variant/30 bg-surface-container-low/40 p-6 md:p-8 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="size-10 shrink-0 rounded-lg bg-surface-container-high" />
              <div className="h-4 w-40 max-w-full rounded bg-surface-container-high" />
            </div>

            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-surface-container-high" />
              <div className="h-4 w-full rounded bg-surface-container-high" />
              <div className="h-4 w-2/3 rounded bg-surface-container-high" />
            </div>

            <div className="mt-4 h-14 w-full rounded-xl bg-surface-container-high" />
          </div>

          <div className="mt-8 flex w-full justify-end">
            <div className="h-10 w-24 rounded-lg bg-surface-container-high" />
          </div>
        </div>
      </div>
    </main>
  );
}

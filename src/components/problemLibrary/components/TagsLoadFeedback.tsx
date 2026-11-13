import type { LoadStatus } from "../../../shared/utilities/LoadStatus.ts";

interface TagsLoadFeedbackProps {
  loadStatus: LoadStatus;
  onRetry: () => void;
}

export default function TagsLoadFeedback({ loadStatus, onRetry }: TagsLoadFeedbackProps) {
  if (loadStatus === "success") return null;

  if (loadStatus === "loading") {
    return (
      <div role="status" className="flex items-center gap-2 py-2">
        <span className="sr-only">Loading tags…</span>
        <div aria-hidden="true" className="flex gap-2 motion-safe:animate-pulse">
          <div className="h-7 w-20 rounded-full bg-surface-container-high" />
          <div className="h-7 w-28 rounded-full bg-surface-container-high" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-body-md">
      <p role="alert" className="text-on-surface-variant">Couldn't load tags.</p>
      <button
        type="button"
        onClick={onRetry}
        aria-label="Retry loading tags"
        className="cursor-pointer rounded-lg px-3 py-2 text-primary underline underline-offset-4 hover:bg-surface-container-high focus-visible:outline-primary"
      >
        Retry
      </button>
    </div>
  );
}

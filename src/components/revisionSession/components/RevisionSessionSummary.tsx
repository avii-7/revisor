import { FaCheckCircle, FaFlagCheckered } from "react-icons/fa";

interface RevisionSessionSummaryProps {
  duration: string;
  revisedCount: number;
  skippedCount: number;
  onExit: () => void;
}

export default function RevisionSessionSummary({
  duration, revisedCount, skippedCount, onExit,
}: RevisionSessionSummaryProps) {
  const allReviewed = skippedCount === 0;
  const Icon = allReviewed ? FaCheckCircle : FaFlagCheckered;

  return (
    <section className="max-w-md w-full bg-surface-container-low/65 border border-outline-variant/35 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-md flex flex-col items-center">
      <Icon className="size-16 text-primary mb-6" />
      <h1 className="text-headline-md font-bold text-on-surface mb-2">
        {allReviewed ? "Revision Complete!" : "Session Finished"}
      </h1>
      <p className="text-body-md text-on-surface-variant mb-6">
        {allReviewed
          ? "You reviewed every problem in this session."
          : "Skipped problems remain due. You can review them in a future session."}
      </p>

      <div className="w-full grid grid-cols-2 gap-4 mb-8">
        <div className="bg-surface-container/40 border border-outline-variant/25 rounded-xl p-4 text-center">
          <span className="block text-label-sm font-semibold tracking-wider text-primary uppercase mb-1">
            Time Spent
          </span>
          <span className="text-headline-md font-semibold text-on-surface font-mono">
            {duration}
          </span>
        </div>
        <div className="bg-surface-container/40 border border-outline-variant/25 rounded-xl p-4 text-center">
          <span className="block text-label-sm font-semibold tracking-wider text-primary uppercase mb-1">
            Revised
          </span>
          <span className="text-headline-md font-semibold text-on-surface font-mono">
            {revisedCount} Items
          </span>
        </div>
        <div className="col-span-2 bg-surface-container/40 border border-outline-variant/25 rounded-xl p-4 text-center">
          <span className="block text-label-sm font-semibold tracking-wider text-primary uppercase mb-1">
            Skipped
          </span>
          <span className="text-headline-md font-semibold text-on-surface font-mono">
            {skippedCount} Items
          </span>
        </div>
      </div>

      <button
        onClick={onExit}
        className="w-full rounded-lg bg-primary-container px-6 py-3 text-label-sm font-semibold text-on-primary-container shadow-[0_12px_30px_rgba(77,142,255,0.22)] hover:bg-primary hover:text-on-primary transition duration-150 active:scale-[0.98] cursor-pointer"
      >
        Back to Dashboard
      </button>
    </section>
  );
}

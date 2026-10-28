import { FaFileAlt, FaLightbulb, FaCode, FaLink } from "react-icons/fa";
import type { RevisionItemType } from "../../dashboard/models/RevisionItem.ts";
import type { Rating } from "../../dashboard/tagsMenu/Rating.ts";
import ReviewRatingControls from "./ReviewRatingControls.tsx";

interface ReviewProblemProps {
  currentItem: RevisionItemType;
  currentIndex: number;
  totalItems: number;
  isRevealed: boolean;
  isSubmitting: boolean;
  hasSubmissionError: boolean;
  onReveal: () => void;
  onAssess: (rating: Rating) => void;
  onNext: () => void;
}

export default function ReviewProblem({
  currentItem, currentIndex, totalItems, isRevealed, isSubmitting,
  hasSubmissionError, onReveal, onAssess, onNext,
}: ReviewProblemProps) {
  return (
    <section className="w-full max-w-[800px] flex flex-col items-center">
      {/* Header Badges */}
      <span className="text-[10px] font-bold uppercase tracking-[0.1em] bg-surface-container border border-outline-variant/20 text-on-surface-variant px-2.5 py-0.5 rounded-md">
        Problem {currentIndex + 1} of {totalItems}
      </span>

      {/* Title */}
      <h1 className="mt-5 text-headline-md md:text-3xl font-semibold text-on-surface text-center tracking-tight max-w-[650px] leading-snug">
        {currentItem.title}
      </h1>

      {/* Question Details Card */}
      <article className="mt-8 w-full bg-surface-container-low/40 border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md flex flex-col gap-6">

        {/* Problem Description Sub-Card */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-container border border-outline-variant/30 text-primary shadow-[0_0_12px_rgba(77,142,255,0.12)]">
              <FaFileAlt className="size-4" />
            </div>
            <span className="text-label-sm font-semibold tracking-[0.08em] text-primary uppercase">
              Problem Description
            </span>
          </div>

          <p className="text-body-md text-on-surface-variant leading-relaxed">
            {currentItem.content || "No description provided."}
          </p>

          {currentItem.platformUrl && (
            <a
              href={currentItem.platformUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 self-start text-label-sm font-medium text-primary hover:text-on-surface transition-colors focus:outline-none"
            >
              <FaLink className="size-3" /> View original problem link
            </a>
          )}
        </div>

        {/* Reveal Section */}
        {!isRevealed ? (
          /* Reveal Trigger Button */
          <button
            onClick={onReveal}
            className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-surface-container-high border border-outline-variant/30 text-label-sm font-semibold text-on-surface py-4 shadow-md transition-colors hover:bg-surface-container-highest active:scale-[0.99] cursor-pointer"
          >
            <FaLightbulb className="size-4 text-primary" /> Reveal Key Intuition & Solution
          </button>
        ) : (
          /* Revealed Content Area with smooth entrance */
          <div className="flex flex-col gap-6 border-t border-outline-variant/25 pt-6 animate-[fadeIn_0.3s_ease-out]">

            {/* Key Intuition Card */}
            {currentItem.keyIntuition ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-primary">
                  <FaLightbulb className="size-4" />
                  <span className="text-label-sm font-semibold tracking-[0.08em] uppercase">
                    Key Intuition
                  </span>
                </div>
                <p className="text-body-md text-on-surface leading-relaxed p-4 bg-surface-container/30 border border-outline-variant/20 rounded-xl">
                  {currentItem.keyIntuition}
                </p>
              </div>
            ) : null}

            {/* Solution Code Card */}
            {currentItem.solutionCode ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-primary">
                  <FaCode className="size-4" />
                  <span className="text-label-sm font-semibold tracking-[0.08em] uppercase">
                    Solution Code
                  </span>
                </div>
                <pre className="p-4 bg-surface-container-lowest/80 border border-outline-variant/20 rounded-xl overflow-x-auto text-sm text-tertiary font-mono text-left leading-relaxed max-h-[300px]">
                  <code>{currentItem.solutionCode}</code>
                </pre>
              </div>
            ) : null}

            <ReviewRatingControls
              nextRevision={currentItem.nextRevision}
              isSubmitting={isSubmitting}
              hasError={hasSubmissionError}
              onAssess={onAssess}
            />
          </div>
        )}
      </article>

      <div className="mt-8 w-full flex items-center justify-end max-w-[800px]">
        <button
          onClick={onNext}
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-surface-container border border-outline-variant/30 px-6 py-2.5 text-label-sm font-semibold text-on-surface transition hover:bg-surface-container-high hover:border-primary/50 active:scale-[0.98] cursor-pointer disabled:cursor-wait disabled:opacity-50"
        >
          {currentIndex === totalItems - 1 ? "Skip & Finish" : "Skip"}
        </button>
      </div>
    </section>
  );
}

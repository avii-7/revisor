import type { NextRevisionType } from "../../dashboard/models/RevisionItem.ts";
import { RatingValues, type Rating } from "../../dashboard/tagsMenu/Rating.ts";
import { capitalize } from "../../../shared/utilities/CommonUtility.ts";
import { relativeTime } from "../../../shared/utilities/dateUtils.ts";

interface ReviewRatingControlsProps {
  nextRevision?: NextRevisionType | null;
  isSubmitting: boolean;
  hasError: boolean;
  onAssess: (rating: Rating) => void;
}

export default function ReviewRatingControls({
  nextRevision, isSubmitting, hasError, onAssess,
}: ReviewRatingControlsProps) {
  const getNextRevisionText = (rating: Rating) => {
    const date = nextRevision?.[rating];
    return date ? relativeTime(date) : "";
  };

  // Helper for styling difficulty tag
  const getRatingStyles = (rating: Rating) => {
    switch (rating) {
      case "easy":
        return `
      border-emerald-500/30
      bg-emerald-500/10
      text-emerald-400
      hover:border-emerald-400/50
      hover:bg-emerald-500/20
      hover:text-emerald-300
    `;

      case "good":
        return `
      border-sky-500/30
      bg-sky-500/10
      text-sky-400
      hover:border-sky-400/50
      hover:bg-sky-500/20
      hover:text-sky-300
    `;

      case "hard":
        return `
      border-amber-500/30
      bg-amber-500/10
      text-amber-400
      hover:border-amber-400/50
      hover:bg-amber-500/20
      hover:text-amber-300
    `;

      case "again":
        return `
      border-rose-500/30
      bg-rose-500/10
      text-rose-400
      hover:border-rose-400/50
      hover:bg-rose-500/20
      hover:text-rose-300
    `;
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      {hasError && (
        <p role="alert" className="rounded-lg border border-error/30 bg-error-container/20 p-4 text-body-md text-error">
          We couldn't save your review. Check your connection, then select a rating to try again.
        </p>
      )}
      {isSubmitting && (
        <p role="status" className="text-center text-body-md text-on-surface-variant">
          Saving review...
        </p>
      )}
      <span className="text-center text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">
        How well did you recall this?
      </span>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {RatingValues.map((rating) => (
          <button
            key={rating}
            onClick={() => onAssess(rating)}
            disabled={isSubmitting}
            className={`flex flex-col items-center justify-center py-2.5 px-4 border rounded-xl transition duration-150 active:scale-[0.98] cursor-pointer disabled:cursor-wait disabled:opacity-50 ${getRatingStyles(rating)}`}
          >
            <span className="font-semibold text-label-sm">{capitalize(rating)}</span>
            <span className="text-[10px] font-medium mt-0.5"> {getNextRevisionText(rating)} </span>
          </button>
        ))}
      </div>
    </div>
  );
}

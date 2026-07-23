import {
  FaCheckCircle,
  FaClock,
  FaEllipsisV,
  FaFolder,
  FaHistory,
} from "react-icons/fa";
import type { RevisionItemModel } from "../../../shared/presenters/RevisionPresenter.ts";
import {
  getProblemActivitySummary,
  getProblemCategoryLabel,
  getProblemLevelLabel,
  getProblemRevisionSummary,
} from "../../../shared/presenters/RevisionPresenter.ts";

interface ProblemCardProps {
  item: RevisionItemModel;
  variant?: "library" | "compact";
}

const levelBadgeClassName: Record<string, string> = {
  easy: "bg-tertiary/16 text-tertiary",
  medium: "bg-secondary/16 text-secondary",
  hard: "bg-error/18 text-error",
};

export default function ProblemCard({
  item,
  variant = "library",
}: ProblemCardProps) {
  if (variant === "compact") {
    return (
      <article className="flex items-center gap-5 border-b border-outline-variant/45 px-6 py-5 last:border-b-0">
        <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-container-high text-primary">
          <FaCheckCircle aria-hidden="true" className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-label-sm font-semibold text-on-surface">
            {item.title}
          </h3>
          <p className="mt-1 truncate text-label-sm font-normal text-on-surface-variant">
            {item.content || getProblemCategoryLabel(item)}
          </p>
        </div>
        <div className="hidden text-right sm:block">
          <p className="text-label-sm font-medium uppercase text-on-surface-variant">
            Streak
          </p>
        </div>
        <button
          className="grid size-8 shrink-0 place-items-center rounded-md text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
          aria-label={`Open actions for ${item.title}`}
          type="button"
        >
          <FaEllipsisV aria-hidden="true" className="size-3" />
        </button>
      </article>
    );
  }

  const level = (item.level || "").toLowerCase();
  const badgeClassName =
    levelBadgeClassName[level] || "bg-primary/16 text-primary";

  return (
    <article className="rounded-[28px] border border-outline-variant/45 bg-surface-container-low/95 px-6 py-6 shadow-[0_20px_60px_rgba(6,14,32,0.32)] transition hover:border-primary/30 sm:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start gap-4">
            <span
              className={`inline-flex min-h-8 items-center rounded-full px-3 text-label-sm font-semibold uppercase ${badgeClassName}`}
            >
              {getProblemLevelLabel(item)}
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-headline-md font-semibold text-on-surface">
                {item.title}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-md text-on-surface-variant">
                <span className="flex items-center gap-2">
                  <FaFolder className="size-4" />
                  {getProblemCategoryLabel(item)}
                </span>
                <span className="flex items-center gap-2">
                  <FaHistory className="size-4" />
                  {getProblemRevisionSummary(item)}
                </span>
                <span className="flex items-center gap-2">
                  <FaClock className="size-4" />
                  {getProblemActivitySummary(item)}
                </span>
              </div>

              {(item.tags?.length || 0) > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-surface-container-high px-3 py-1 text-label-sm font-medium text-on-surface-variant"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label={`Open actions for ${item.title}`}
          className="grid size-10 shrink-0 place-items-center self-end rounded-xl text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface md:self-center"
        >
          <FaEllipsisV className="size-4" />
        </button>
      </div>
    </article>
  );
}

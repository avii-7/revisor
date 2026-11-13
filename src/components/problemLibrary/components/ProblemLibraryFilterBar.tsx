import { FaChevronDown } from "react-icons/fa";
import type { LoadStatus } from "../../../shared/utilities/LoadStatus.ts";
import type { Tag } from "../services/TagService.ts";
import TagsLoadFeedback from "./TagsLoadFeedback.tsx";

interface ProblemLibraryFilterBarProps {
  tags: Tag[];
  selectedTagIds: string[];
  onTagsChange: (ids: string[]) => void;
  loadStatus: LoadStatus;
  onRetry: () => void;
}

export default function ProblemLibraryFilterBar({
  tags,
  selectedTagIds,
  onTagsChange,
  loadStatus,
  onRetry,
}: ProblemLibraryFilterBarProps) {
  if (loadStatus !== "success") {
    return <TagsLoadFeedback loadStatus={loadStatus} onRetry={onRetry} />;
  }

  return (
    <div className="flex flex-wrap items-start gap-3">
      <details className="relative min-w-[240px]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl border border-outline-variant/35 bg-surface-container-low px-4 py-3 text-body-md text-on-surface focus-visible:outline-primary">
          <span>
            {selectedTagIds.length ? `Tags (${selectedTagIds.length})` : "All Tags"}
          </span>
          <FaChevronDown className="size-3 text-on-surface-variant" />
        </summary>
        <div className="absolute right-0 z-20 mt-2 w-full rounded-xl border border-outline-variant/35 bg-surface-container-low p-3 shadow-xl">
          {tags.length === 0 ? (
            <p className="text-body-md text-on-surface-variant">No tags available</p>
          ) : (
            <fieldset className="max-h-64 space-y-1 overflow-y-auto">
              <legend className="sr-only">Filter problems by tags</legend>
              {tags.map((tag) => (
                <label key={tag.id} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-body-md text-on-surface hover:bg-surface-container-high">
                  <input
                    type="checkbox"
                    checked={selectedTagIds.includes(tag.id)}
                    onChange={(event) => onTagsChange(
                      event.target.checked
                        ? [...selectedTagIds, tag.id]
                        : selectedTagIds.filter((id) => id !== tag.id),
                    )}
                    className="size-4 shrink-0 accent-primary"
                  />
                  <span className="break-words">{tag.name}</span>
                </label>
              ))}
            </fieldset>
          )}
        </div>
      </details>
      {selectedTagIds.length > 0 && (
        <button
          type="button"
          onClick={() => onTagsChange([])}
          className="rounded-xl px-3 py-3 text-body-md text-primary hover:bg-surface-container-high"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

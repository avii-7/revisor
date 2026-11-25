import { useRef, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import TagsLoadFeedback from "../problemLibrary/components/TagsLoadFeedback.tsx";
import type { useTags } from "../problemLibrary/hooks/useTags.ts";
import type { Tag } from "../problemLibrary/services/TagService.ts";

interface TagManagerListProps {
  catalog: Pick<ReturnType<typeof useTags>, "tags" | "loadStatus" | "errorReason" | "retry">;
  selectedIds: string[];
  disabled: boolean;
  onSelectionChange: (id: string, selected: boolean) => void;
  onRename: (tag: Tag) => void;
  onDelete: (tag: Tag) => void;
}

const buttonClass = "rounded-lg px-3 py-2 text-label-sm font-semibold focus-visible:outline-primary disabled:opacity-50";

export default function TagManagerList({
  catalog,
  selectedIds,
  disabled,
  onSelectionChange,
  onRename,
  onDelete,
}: TagManagerListProps) {
  const tagListRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const query = search.trim().toLocaleLowerCase();
  const visibleTags = catalog.tags
    .filter((tag) => tag.name.toLocaleLowerCase().includes(query))
    .sort((first, second) => first.name.localeCompare(second.name));

  return (
    <>
      {catalog.loadStatus === "success" && (
        <input
          type="search"
          aria-label="Search tags"
          placeholder="Search tags"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            tagListRef.current?.scrollTo(0, 0);
          }}
          className="mt-4 w-full shrink-0 rounded-lg border border-outline-variant bg-surface-container px-3 py-2 text-body-md text-on-surface placeholder:text-on-surface-variant focus-visible:outline-primary"
        />
      )}

      <div ref={tagListRef} className="mt-4 min-h-0 overflow-y-auto overscroll-contain [scrollbar-color:var(--color-outline)_transparent] [scrollbar-width:thin]">
        <TagsLoadFeedback loadStatus={catalog.loadStatus} errorReason={catalog.errorReason} onRetry={catalog.retry} />
        {catalog.loadStatus === "success" && (
          visibleTags.length > 0 ? (
            <ul aria-label="Available tags" className="divide-y divide-outline-variant/50">
              {visibleTags.map((tag) => (
                <li key={tag.id} className="flex items-center justify-between gap-2 py-2">
                  <label className="flex min-w-0 flex-1 items-center gap-3 px-1 py-2 text-body-md">
                    <input
                      type="checkbox"
                      aria-label={`Use ${tag.name} on this problem`}
                      checked={selectedIds.includes(tag.id)}
                      onChange={(event) => onSelectionChange(tag.id, event.target.checked)}
                      disabled={disabled}
                      className="size-4 shrink-0 accent-primary focus-visible:outline-primary"
                    />
                    <span className="wrap-anywhere">{tag.name}</span>
                  </label>
                  <button
                    type="button"
                    aria-label={`Rename ${tag.name}`}
                    title="Rename"
                    disabled={disabled}
                    onClick={() => onRename(tag)}
                    className={`${buttonClass} text-primary hover:bg-surface-container-high`}
                  >
                    <FaPencilAlt aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${tag.name}`}
                    title="Delete"
                    disabled={disabled}
                    aria-haspopup="dialog"
                    onClick={() => onDelete(tag)}
                    className={`${buttonClass} text-error hover:bg-error-container/30`}
                  >
                    <FaTrash aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p role="status" className="text-body-md text-on-surface-variant">
              {catalog.tags.length ? "No matching tags." : "No tags yet."}
            </p>
          )
        )}
      </div>
    </>
  );
}

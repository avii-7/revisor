import { useState } from "react";
import { FaChevronDown, FaPlus, FaTags, FaTimes } from "react-icons/fa";
import TagsLoadFeedback from "../problemLibrary/components/TagsLoadFeedback.tsx";
import { useTags } from "../problemLibrary/hooks/useTags.ts";
import TagManagerDialog from "./TagManagerDialog.tsx";

interface ItemTagsFieldProps {
  selectedIds: string[];
  onSelectionChange: (id: string, selected: boolean) => void;
  disabled: boolean;
}

export default function ItemTagsField({ selectedIds, onSelectionChange, disabled }: ItemTagsFieldProps) {
  const catalog = useTags();
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const availableTags = catalog.tags.filter((tag) => !selectedIds.includes(tag.id));
  const canAddTag = catalog.loadStatus === "success" && availableTags.length > 0;

  return (
    <section aria-labelledby="problem-tags-label" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="problem-tags-label" className="text-label-sm font-semibold uppercase text-primary-fixed-dim">
          Tags
        </h2>
        <button
          type="button"
          aria-haspopup="dialog"
          disabled={disabled}
          onClick={() => setIsManagerOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-label-sm font-semibold text-primary hover:bg-surface-container-high focus-visible:outline-primary disabled:opacity-50"
        >
          <FaTags aria-hidden="true" /> Manage tags
        </button>
      </div>

      {(selectedIds.length > 0 || canAddTag) && (
        <ul aria-label="Problem tags" className="flex flex-wrap items-center gap-2">
          {selectedIds.map((id) => {
            const name = catalog.tagsById.get(id) ?? "Unavailable tag";
            return (
              <li key={id} className="inline-flex max-w-full items-center gap-1 rounded-full bg-surface-container-high px-3 py-1 text-label-sm text-on-surface">
                <span className="wrap-anywhere">{name}</span>
                <button
                  type="button"
                  aria-label={`Remove ${name} from this problem`}
                  disabled={disabled}
                  onClick={() => onSelectionChange(id, false)}
                  className="grid size-6 shrink-0 place-items-center rounded-full text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface focus-visible:outline-primary disabled:opacity-50"
                >
                  <FaTimes aria-hidden="true" />
                </button>
              </li>
            );
          })}
          {canAddTag && (
            <li className="relative inline-flex items-center text-primary">
              <FaPlus aria-hidden="true" className="pointer-events-none absolute left-3 size-2.5" />
              <select
                aria-label="Add an existing tag"
                value=""
                disabled={disabled}
                onChange={(event) => onSelectionChange(event.target.value, true)}
                className="h-8 w-30 cursor-pointer appearance-none rounded-full border border-dashed border-outline-variant bg-transparent pl-7 pr-6 text-label-sm font-semibold text-primary scheme-dark hover:border-primary hover:bg-surface-container-high focus-visible:outline-primary disabled:cursor-default disabled:opacity-50"
              >
                <option value="" disabled>Add a tag</option>
                {availableTags.map((tag) => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
              </select>
              <FaChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 size-2" />
            </li>
          )}
        </ul>
      )}

      <TagsLoadFeedback loadStatus={catalog.loadStatus} errorReason={catalog.errorReason} onRetry={catalog.retry} />
      {catalog.loadStatus === "success" && catalog.tags.length === 0 && selectedIds.length === 0 && (
        <p className="text-label-sm text-on-surface-variant">No tags yet.</p>
      )}

      {isManagerOpen && (
        <TagManagerDialog
          catalog={catalog}
          selectedIds={selectedIds}
          onSelectionChange={onSelectionChange}
          onClose={() => setIsManagerOpen(false)}
        />
      )}
    </section>
  );
}

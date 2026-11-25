import { useEffect, useRef, type FormEvent } from "react";
import type { Tag } from "../problemLibrary/services/TagService.ts";

interface TagNameFormProps {
  tagToRename: Tag | null;
  name: string;
  isPending: boolean;
  errorMessage: string | undefined;
  onNameChange: (name: string) => void;
  onSave: (name: string) => Promise<void>;
  onCancelRename: () => void;
}

const buttonClass = "rounded-lg px-3 py-2 text-label-sm font-semibold focus-visible:outline-primary disabled:opacity-50";

export default function TagNameForm({
  tagToRename,
  name,
  isPending,
  errorMessage,
  onNameChange,
  onSave,
  onCancelRename,
}: TagNameFormProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const trimmedName = name.trim();

  useEffect(() => {
    if (tagToRename) nameRef.current?.focus();
  }, [tagToRename]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (trimmedName && !isPending) void onSave(trimmedName);
  };

  return (
    <form onSubmit={handleSubmit} aria-busy={isPending} className="mt-4 flex shrink-0 flex-col gap-3 border-t border-outline-variant/50 pt-4">
      <label className="flex flex-col gap-2 text-label-sm font-semibold text-primary-fixed-dim">
        {tagToRename ? "Rename tag" : "New tag name"}
        <input
          ref={nameRef}
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          disabled={isPending}
          required
          className="w-full rounded-lg border border-outline-variant bg-surface-container px-3 py-2 text-body-md text-on-surface focus-visible:outline-primary disabled:opacity-50"
        />
      </label>

      {errorMessage && <p role="alert" className="text-body-md text-error">{errorMessage}</p>}
      <div className="flex flex-wrap justify-end gap-2">
        {tagToRename && (
          <button
            type="button"
            disabled={isPending}
            onClick={onCancelRename}
            className={`${buttonClass} text-on-surface-variant hover:bg-surface-container-high`}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isPending || !trimmedName}
          className={`${buttonClass} bg-primary text-on-primary`}
        >
          {isPending ? "Working…" : tagToRename ? "Save name" : "Create and add"}
        </button>
      </div>
    </form>
  );
}

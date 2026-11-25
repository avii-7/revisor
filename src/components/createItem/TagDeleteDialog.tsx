import { useEffect, useRef } from "react";
import { getApiErrorReason } from "../../network/getApiErrorReason.ts";
import { useAsyncAction } from "../../shared/utilities/useAsyncAction.ts";
import type { Tag } from "../problemLibrary/services/TagService.ts";

interface TagDeleteDialogProps {
  tag: Tag;
  onDelete: (id: string) => Promise<void>;
  onClose: () => void;
}

export default function TagDeleteDialog({ tag, onDelete, onClose }: TagDeleteDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { state, execute, isPending } = useAsyncAction(onDelete);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const confirmDelete = async () => {
    const result = await execute(tag.id);
    if (result.status === "success") dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      role="alertdialog"
      aria-labelledby="tag-delete-title"
      aria-describedby="tag-delete-description"
      onClose={onClose}
      onCancel={(event) => { if (isPending) event.preventDefault(); }}
      className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-xl border border-outline-variant bg-surface-container p-5 font-primary text-on-surface shadow-xl backdrop:bg-surface-container-lowest/80 sm:p-6"
    >
      <h2 id="tag-delete-title" className="wrap-anywhere text-headline-md">Delete “{tag.name}”?</h2>
      <p id="tag-delete-description" className="mt-2 text-body-md text-on-surface-variant">
        This permanently deletes the tag and removes it from every problem that uses it.
      </p>
      {state.status === "error" && (
        <p role="alert" className="mt-3 text-body-md text-error">
          {getApiErrorReason(state.error) ?? "Couldn’t delete the tag. Try again."}
        </p>
      )}
      <div className="mt-5 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          disabled={isPending}
          onClick={() => dialogRef.current?.close()}
          className="rounded-lg px-3 py-2 text-label-sm font-semibold text-on-surface-variant hover:bg-surface-container-high focus-visible:outline-primary disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={confirmDelete}
          className="rounded-lg bg-error-container px-3 py-2 text-label-sm font-semibold text-on-error-container focus-visible:outline-error disabled:opacity-50"
        >
          {isPending ? "Deleting…" : "Delete tag"}
        </button>
      </div>
    </dialog>
  );
}

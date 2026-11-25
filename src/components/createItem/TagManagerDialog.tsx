import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getApiErrorReason } from "../../network/getApiErrorReason.ts";
import { useAsyncAction } from "../../shared/utilities/useAsyncAction.ts";
import type { useTags } from "../problemLibrary/hooks/useTags.ts";
import type { Tag } from "../problemLibrary/services/TagService.ts";
import TagDeleteDialog from "./TagDeleteDialog.tsx";
import TagManagerList from "./TagManagerList.tsx";
import TagNameForm from "./TagNameForm.tsx";

interface TagManagerDialogProps {
  catalog: ReturnType<typeof useTags>;
  selectedIds: string[];
  onSelectionChange: (id: string, selected: boolean) => void;
  onClose: () => void;
}

export default function TagManagerDialog({ catalog, selectedIds, onSelectionChange, onClose }: TagManagerDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [tagToRename, setTagToRename] = useState<Tag | null>(null);
  const [name, setName] = useState("");
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);

  const { state, execute, reset, isPending } = useAsyncAction(async (name: string) => {
    if (tagToRename) {
      await catalog.renameTag(tagToRename.id, name);
    } else {
      const tag = await catalog.createTag(name);
      onSelectionChange(tag.id, true);
    }
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const editTagName = (tag: Tag | null) => {
    setTagToRename(tag);
    setName(tag?.name ?? "");
    reset();
  };

  const saveTagName = async (name: string) => {
    const result = await execute(name);
    if (result.status === "success") editTagName(null);
  };

  const deleteTag = async (tagId: string) => {
    await catalog.deleteTag(tagId);
    onSelectionChange(tagId, false);
    if (tagToRename?.id === tagId) editTagName(null);
  };

  const errorMessage = state.status === "error"
    ? getApiErrorReason(state.error) ?? `Couldn’t ${tagToRename ? "rename" : "create"} the tag. Try again.`
    : undefined;

  const managerDialog = (
    <dialog
      ref={dialogRef}
      aria-labelledby="tag-manager-title"
      aria-describedby="tag-manager-description"
      onClose={onClose}
      onCancel={(event) => { if (isPending) event.preventDefault(); }}
      className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl overflow-clip rounded-xl border border-outline-variant bg-surface-container-low p-5 font-primary text-on-surface shadow-xl open:flex open:flex-col backdrop:bg-surface-container-lowest/80 sm:p-6"
    >
      <div className="flex shrink-0 items-center justify-between gap-3">
        <h2 id="tag-manager-title" className="text-headline-md">Manage tags</h2>
        <button
          type="button"
          className="rounded-lg px-3 py-2 text-label-sm font-semibold text-primary hover:bg-surface-container-high focus-visible:outline-primary disabled:opacity-50"
          disabled={isPending}
          onClick={() => dialogRef.current?.close()}
        >
          Done
        </button>
      </div>
      <p id="tag-manager-description" className="mt-2 shrink-0 text-body-md text-on-surface-variant">
        Tag creation, renaming, and deletion take effect immediately. Tag selections are saved with the problem.
      </p>

      <TagManagerList
        catalog={catalog}
        selectedIds={selectedIds}
        disabled={isPending}
        onSelectionChange={onSelectionChange}
        onRename={editTagName}
        onDelete={setTagToDelete}
      />

      {catalog.loadStatus === "success" && (
        <TagNameForm
          tagToRename={tagToRename}
          name={name}
          isPending={isPending}
          errorMessage={errorMessage}
          onNameChange={setName}
          onSave={saveTagName}
          onCancelRename={() => editTagName(null)}
        />
      )}
    </dialog>
  );

  return createPortal(
    <>
      {managerDialog}
      {tagToDelete && (
        <TagDeleteDialog tag={tagToDelete} onDelete={deleteTag} onClose={() => setTagToDelete(null)} />
      )}
    </>,
    document.body,
  );
}

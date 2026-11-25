import { useEffect, useMemo, useState } from "react";
import { getApiErrorReason } from "../../../network/getApiErrorReason.ts";
import type { LoadStatus } from "../../../shared/utilities/LoadStatus.ts";
import TagService, { type Tag } from "../services/TagService.ts";

const tagService = new TagService();

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("loading");
  const [errorReason, setErrorReason] = useState<string>();
  const [reloadToken, setReloadToken] = useState(0);

  const retry = () => {
    setLoadStatus("loading");
    setErrorReason(undefined);
    setReloadToken((current) => current + 1);
  };

  useEffect(() => {
    let active = true;

    const loadTags = async () => {
      try {
        const data = await tagService.loadTags();
        if (active) {
          setTags(data);
          setLoadStatus("success");
        }
      } catch (error) {
        if (active) {
          setErrorReason(getApiErrorReason(error));
          setLoadStatus("error");
        }
      }
    };

    void loadTags();
    return () => { active = false; };
  }, [reloadToken]);

  const tagsById = useMemo(() => new Map(tags.map((tag) => [tag.id, tag.name])), [tags]);

  const createTag = async (name: string) => {
    const tag = await tagService.create(name);
    setTags((current) => [...current, tag]);
    return tag;
  };

  const renameTag = async (id: string, name: string) => {
    const tag = await tagService.rename(id, name);
    setTags((current) => current.map((entry) => entry.id === id ? tag : entry));
  };

  const deleteTag = async (id: string) => {
    await tagService.delete(id);
    setTags((current) => current.filter((tag) => tag.id !== id));
  };

  return { tags, tagsById, loadStatus, errorReason, retry, createTag, renameTag, deleteTag };
}

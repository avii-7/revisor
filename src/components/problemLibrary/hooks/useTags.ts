import { useEffect, useMemo, useState } from "react";
import type { LoadStatus } from "../../../shared/utilities/LoadStatus.ts";
import TagService, { type Tag } from "../services/TagService.ts";

const tagService = new TagService();

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("loading");
  const [reloadToken, setReloadToken] = useState(0);

  const retry = () => {
    setLoadStatus("loading");
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
      } catch {
        if (active) setLoadStatus("error");
      }
    };

    void loadTags();
    return () => { active = false; };
  }, [reloadToken]);

  const tagsById = useMemo(() => new Map(tags.map((tag) => [tag.id, tag.name])), [tags]);

  return { tags, tagsById, loadStatus, retry };
}

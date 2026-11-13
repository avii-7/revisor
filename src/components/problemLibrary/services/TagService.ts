import z from "zod";
import apiClient from "../../../network/ApiClient.ts";
import { TagEndpoint } from "../../../network/Endpoints.ts";
import { TagSchema } from "../../dashboard/models/RevisionItem.ts";

const TagsResponseSchema = z.object({ tags: z.array(TagSchema) });

export type Tag = z.infer<typeof TagSchema>;

export default class TagService {
  async loadTags(): Promise<Tag[]> {
    const response = await apiClient.get(TagEndpoint.tags);
    return TagsResponseSchema.parse(response.data).tags;
  }
}

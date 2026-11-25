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

  async create(name: string): Promise<Tag> {
    const response = await apiClient.post(TagEndpoint.tags, { name });
    return TagSchema.parse(response.data);
  }

  async rename(id: string, name: string): Promise<Tag> {
    const response = await apiClient.patch(TagEndpoint.tag(id), { name });
    return TagSchema.parse(response.data);
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(TagEndpoint.tag(id));
  }
}

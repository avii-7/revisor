import apiClient from "../../../Network/ApiClient";
import { RevisionItemEndpoint } from "../../../Network/Endpoints";
import type { NewRevisionItem, RevisionItemSchema, RevisionItem } from "../Models/RevisionItem";
import z from 'zod';

export default class RevisionItemService {

    async getRevisionItems() {
        type schema = z.infer<typeof RevisionItemSchema>
        const response = await apiClient.get<schema[]>(RevisionItemEndpoint.revisionItems);

        const items = response.data.map<RevisionItem>(item => {
             return {
                id: item.id,
                title: item.title,
                content: item.content,
                revisionCount: item.revision_count,
                difficulty: item.difficulty
            }
        });

        return items;
    }

    async create(item: NewRevisionItem) {
        const response = await apiClient.post<NewRevisionItem>(RevisionItemEndpoint.revisionItems, item);
        console.log(response.status);
    }

    async update(item: RevisionItem) {
        console.log("Execute !!");
        const response = await apiClient.patch(RevisionItemEndpoint.revisionItems, item);
        console.log(response.status);
    }

    async delete(itemId: string) {
        const response = await apiClient.delete(`${RevisionItemEndpoint.revisionItems}/${itemId}`);
        console.log(response.status);
    }
}
import apiClient from "../../../Network/ApiClient";
import Endpoint from "../../../Network/Endpoints";
import { NewRevisionItem, RevisionItemSchema, RevisionItem } from "../Models/RevisionItem";
import z from 'zod';

export default class RevisionItemService {

    async getRevisionItems() {
        type schema = z.infer<typeof RevisionItemSchema>
        const response = await apiClient.get<schema[]>(Endpoint.revisionItems);

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
        const response = await apiClient.post<NewRevisionItem>(Endpoint.revisionItems, item);
        console.log(response.status);
    }

    async update(item: RevisionItem) {
        console.log("Execute !!");
        const response = await apiClient.patch(Endpoint.revisionItems, item);
        console.log(response.status);
    }

    async delete(itemId: string) {
        const response = await apiClient.delete(`${Endpoint.revisionItems}/${itemId}`);
        console.log(response.status);
    }
}
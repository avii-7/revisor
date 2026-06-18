import apiClient from "../../../network/ApiClient.ts";
import { RevisionItemEndpoint } from "../../../network/Endpoints.ts";
import { RevisionItemSchema, type NewRevisionItem, type RevisionItem, type RevisionItemType } from "../models/RevisionItem.ts";
import z from 'zod';

export default class RevisionItemService {

    async getRevisionItems(): Promise<RevisionItemType[]> {
        const response = await apiClient.get(RevisionItemEndpoint.revisionItems);
        return z.array(RevisionItemSchema).parse(response.data);
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
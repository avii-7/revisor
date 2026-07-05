import apiClient from "../../../network/ApiClient.ts";
import { RevisionEndpoint } from "../../../network/Endpoints.ts";
import { RevisionItemSchema, type RevisionItemType, type CreateRevisionItemType, type ReviewRequest } from "../models/RevisionItem.ts";
import z from 'zod';
import type { Rating } from "../tagsMenu/Rating.ts";

export default class RevisionService {

    async dueRevisionItems(): Promise<RevisionItemType[]> {
        const response = await apiClient.get(RevisionEndpoint.dueRevisionItems);
        return z.array(RevisionItemSchema).parse(response.data);
    }

    async revisionItems(): Promise<RevisionItemType[]> {
        const response = await apiClient.get(RevisionEndpoint.revisionItems);
        return z.array(RevisionItemSchema).parse(response.data);
    }

    async create(item: CreateRevisionItemType) {
        const response = await apiClient.post<CreateRevisionItemType>(RevisionEndpoint.revisionItems, item);
        console.log(response.status);
    }

    async update(item: RevisionItemType) {
        const response = await apiClient.patch(RevisionEndpoint.revisionItems, item);
        console.log(response.status);
    }

    async submitReview(request: ReviewRequest) {
        const response = await apiClient.post(`${RevisionEndpoint.revisionItems}/${request.itemID}/review/`, { rating: request.rating });
        console.log(response.status);
    }

    async delete(itemId: string) {
        const response = await apiClient.delete(`${RevisionEndpoint.revisionItems}/${itemId}`);
        console.log(response.status);
    }
}
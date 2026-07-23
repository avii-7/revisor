import apiClient from "../../../network/ApiClient.ts";
import { RevisionEndpoint } from "../../../network/Endpoints.ts";
import {
    RevisionItemSchema,
    RevisionItemsPageSchema,
    type RevisionItemType,
    type RevisionItemsPageType,
    type CreateRevisionItemType,
    type ReviewRequest,
} from "../models/RevisionItem.ts";
import z from 'zod';

export interface PageRequestType {
    page: number;
    size: number;
}

export default class RevisionService {

    async dueRevisionItems(): Promise<RevisionItemType[]> {
        const response = await apiClient.get(RevisionEndpoint.dueItems);
        return z.array(RevisionItemSchema).parse(response.data);
    }

    async previewRevisionItems(): Promise<RevisionItemType[]> {
        const response = await apiClient.get(RevisionEndpoint.previewItems);
        return z.array(RevisionItemSchema).parse(response.data);
    }

    async revisionItems(pageRequest: PageRequestType): Promise<RevisionItemsPageType> {
        const response = await apiClient.post(RevisionEndpoint.items, pageRequest)
        return RevisionItemsPageSchema.parse(response.data);
    }

    async create(item: CreateRevisionItemType) {
        const response = await apiClient.post<CreateRevisionItemType>(RevisionEndpoint.items, item);
        console.log(response.status);
    }

    async update(item: RevisionItemType) {
        const response = await apiClient.patch(RevisionEndpoint.items, item);
        console.log(response.status);
    }

    async submitReview(request: ReviewRequest) {
        const response = await apiClient.post(`${RevisionEndpoint.items}/${request.itemID}/review/`, { rating: request.rating });
        console.log(response.status);
    }

    async delete(itemId: string) {
        const response = await apiClient.delete(`${RevisionEndpoint.items}/${itemId}`);
        console.log(response.status);
    }
}

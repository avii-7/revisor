import apiClient from "../../../Network/ApiClient";
import Endpoint  from "../../../Network/Endpoints";
import { NewRevisionItem, RevisionItemSchema } from "../Models/RevisionItem";
import z from 'zod';

export default class RevisionItemService {

    async getRevisionItems() {
        type schema = z.infer<typeof RevisionItemSchema>
        const response = await apiClient.get<schema>(Endpoint.revisionItems);
        return response.data;
    }

    async create(item: NewRevisionItem) {
        const response = await apiClient.post<NewRevisionItem>(Endpoint.revisionItems, item);
        console.log(response.status);
    }
}
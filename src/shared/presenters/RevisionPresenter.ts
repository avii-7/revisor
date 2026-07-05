import type RevisionService from "../../components/dashboard/services/RevisionItemService";
import type { RevisionItemType, NextRevisionType } from "../../components/dashboard/models/RevisionItem";

export class RevisionPresnter {
    private readonly service: RevisionService

    constructor(service: RevisionService) {
        this.service = service;
    }

    async loadDueItems(): Promise<RevisionItemModel[]> {
        return (await this.service.dueRevisionItems()).map(toRevisionItemModel);
    }

    async loadRevisionItems(): Promise<RevisionItemModel[]> {
        return (await this.service.revisionItems()).map(toRevisionItemModel);
    }

    async create(item: NewRevisionItemRequest) {
        await this.service.create(item);
    }
}

function toRevisionItemModel(response: RevisionItemType): RevisionItemModel {
    return {
        id: response.id,
        title: response.title,
        content: response.content,
        platformUrl: response.platformUrl,
        keyIntuition: response.keyIntuition,
        solutionCode: response.solutionCode,
        nextRevision: toNextRevisionModel(response.nextRevision),
        due: response.due,
        lastReview: response.lastReview
    }
}

function toNextRevisionModel(response: NextRevisionType | null): NextRevisionModel | null {

    if (!response) return null;

    return {
        easy: response.easy,
        good: response.good,
        hard: response.hard,
        again: response.again
    }
}

export interface RevisionItemModel {
    id: string;
    title: string;
    content: string | null;
    platformUrl: string | null;
    keyIntuition: string | null;
    solutionCode: string | null;
    nextRevision: NextRevisionModel | null;
    due: Date;
    lastReview: Date | null;
}

export interface NextRevisionModel {
    easy: Date;
    good: Date;
    hard: Date;
    again: Date;
}

export interface NewRevisionItemRequest {
    title: string;
    content: string | null,
    platformUrl: string | null,
    keyIntuition: string | null,
    solutionCode: string | null,
}
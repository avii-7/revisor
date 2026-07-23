import { relativeTime } from "../utilities/dateUtils.ts";
import type { PageRequestType } from "../../components/dashboard/services/RevisionItemService";
import type {
    RevisionItemType,
    NextRevisionType,
    RevisionItemsPageType,
} from "../../components/dashboard/models/RevisionItem";
import type RevisionService from "../../components/dashboard/services/RevisionItemService";

export class RevisionPresnter {
    private readonly service: RevisionService

    constructor(service: RevisionService) {
        this.service = service;
    }

    async loadDueItems(): Promise<RevisionItemModel[]> {
        return (await this.service.dueRevisionItems()).map(toRevisionItemModel);
    }

    async previewRevisionItems(): Promise<RevisionItemModel[]> {
        return (await this.service.previewRevisionItems()).map(toRevisionItemModel);
    }

    // async loadRevisionItems(): Promise<RevisionItemModel[]> {
    //     return (await this.service.revisionItems()).map(toRevisionItemModel);
    // }

    async loadProblemLibrary(query: PageRequestType): Promise<ProblemLibraryModel> {
        return toProblemLibraryModel(await this.service.revisionItems(query));
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
        lastReview: response.lastReview,
        category: response.category,
        level: response.level,
        revisionCount: response.revisionCount ?? 0,
        createdAt: response.createdAt,
        tags: response.tags ?? [],
    }
}

function toProblemLibraryModel(response: RevisionItemsPageType): ProblemLibraryModel {
    return {
        items: response.items.map(toRevisionItemModel),
        page: response.page,
        pageSize: response.pageSize,
        totalItems: response.totalItems,
        totalPages: response.totalPages,
    };
}

function toNextRevisionModel(response: NextRevisionType | null | undefined): NextRevisionModel | null {

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
    content?: string | null;
    platformUrl?: string | null;
    keyIntuition?: string | null;
    solutionCode?: string | null;
    nextRevision?: NextRevisionModel | null;
    due?: string;
    lastReview?: string | null;
    category?: string | null;
    level?: string | null;
    revisionCount?: number;
    createdAt?: string | null;
    tags?: string[];
}

export interface ProblemLibraryModel {
    items: RevisionItemModel[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    categories: string[];
    levels: string[];
}

export interface NextRevisionModel {
    easy: string;
    good: string;
    hard: string;
    again: string;
}

export interface NewRevisionItemRequest {
    title: string;
    content: string | null,
    platformUrl: string | null,
    keyIntuition: string | null,
    solutionCode: string | null,
}

export function getProblemLevelLabel(item: RevisionItemModel): string {
    return normalizeLabel(item.level || "unknown");
}

export function getProblemCategoryLabel(item: RevisionItemModel): string {
    return item.category || "Uncategorized";
}

export function getProblemRevisionSummary(item: RevisionItemModel): string {
    const revisionCount = item.revisionCount ?? 0;

    if (revisionCount === 1) {
        return "Revised 1 time";
    }

    return `Revised ${revisionCount} times`;
}

export function getProblemActivitySummary(item: RevisionItemModel): string {
    if (item.lastReview) {
        return `Last revised ${relativeTime(item.lastReview)}`;
    }

    if (item.createdAt) {
        return `Created ${relativeTime(item.createdAt)}`;
    }

    return "No revision activity yet";
}

function normalizeLabel(value: string): string {
    return value.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

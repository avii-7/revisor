import { relativeTime } from "../utilities/dateUtils.ts";
import type { PageRequestType } from "../../components/dashboard/services/RevisionItemService";
import type {
    RevisionItemType,
    NextRevisionType,
    PaginatedRevisionItemType,
    PreviewRevisionItemType,
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

    async previewRevisionItems(): Promise<PreviewRevisionItemModel[]> {
        return (await this.service.previewRevisionItems()).map(toPreviewRevisionItemModel);
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

    async loadItem(id: string): Promise<RevisionItemModel> {
        return toRevisionItemModel(await this.service.getRevisionItem(id));
    }

    async update(id: string, updatedFields: Partial<RevisionItemModel>): Promise<void> {
        const currentItem = await this.service.getRevisionItem(id);
        const merged = {
            ...currentItem,
            title: updatedFields.title ?? currentItem.title,
            platformUrl: updatedFields.platformUrl !== undefined ? updatedFields.platformUrl : currentItem.platformUrl,
            keyIntuition: updatedFields.keyIntuition !== undefined ? updatedFields.keyIntuition : currentItem.keyIntuition,
            solutionCode: updatedFields.solutionCode !== undefined ? updatedFields.solutionCode : currentItem.solutionCode,
        };
        await this.service.update(merged);
    }

    async delete(id: string): Promise<void> {
        await this.service.delete(id);
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
        revisionCount: response.revisionCount ?? 0,
        tags: response.tags?.map(t => t.name) ?? [],
    }
}

function toPreviewRevisionItemModel(response: PreviewRevisionItemType): PreviewRevisionItemModel {
    return {
        id: response.id,
        title: response.title,
        subtitle: response.subtitle,
        lastReview: response.lastReview,
        revisionCount: response.revisionCount ?? 0,
        tags: response.tags?.map(t => t.name) ?? [],
    }
}

function toProblemLibraryModel(response: PaginatedRevisionItemType): ProblemLibraryModel {
    return {
        items: response.items.map(toPreviewRevisionItemModel),
        page: response.metadata.page,
        pageSize: response.metadata.per,
        totalItems: response.metadata.total,
        totalPages: response.metadata.pageCount,
        categories: [],
        levels: [],
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

export interface PreviewRevisionItemModel {
    id: string;
    title: string;
    subtitle?: string | null;
    lastReview?: string | null;
    revisionCount?: number;
    tags?: string[];
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
    revisionCount?: number;
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

    return "No revision activity yet";
}

function normalizeLabel(value: string): string {
    return value.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

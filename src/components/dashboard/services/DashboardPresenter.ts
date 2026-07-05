import DashboardService from "./DashboardService";
import type ProfileModel from "../../profile/Models/Profile";
import { type DashboardResponseType } from "../models/DashboardResponse";

const RevisionState = ["ready", "completed"] as const;

export interface RevisionStatModel {
    id: string;
    title: string;
    value: string;
}

export interface RevisionInfoModel {
    title: string;
    subtitle: string | null;
    ctaText: string | null;
    state: typeof RevisionState[number];
}

export interface DashboardModel {
    profile: ProfileModel;
    revisionInfo?: RevisionInfoModel;
    revisionStats: RevisionStatModel[];
}

export class DashboardPresenter {

    private readonly service: DashboardService

    constructor(service: DashboardService) {
        this.service = service
    }

    async load(): Promise<DashboardModel> {
        const response = await this.service.dashboardData();

        let info: RevisionInfoModel | null = null;

        if (response.revisionInfo.state == "ready" && response.revisionInfo.nextItem?.title) {
            info = {
                title: response.revisionInfo.nextItem?.title,
                ctaText: "Start",
                subtitle: `${response.revisionInfo.dueItemCount} revision(s) due`,
                state: "ready"
            }
        }
        else {
            info = {
                title: "All caught up!",
                ctaText: null,
                subtitle: null,
                state: "completed"
            }
        }

        const model: DashboardModel = toDashboardModel(response, info);
        return model
    }
}

function toDashboardModel(response: DashboardResponseType, info?: RevisionInfoModel): DashboardModel {
    return {
        profile: response.profile,
        revisionInfo: info,
        revisionStats: response.revisionStats.map((stat) => ({
            id: stat.id,
            title: stat.title,
            value: stat.value
        }))
    }
}
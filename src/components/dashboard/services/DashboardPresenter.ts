import type DashboardService from "./DashboardService";
import type { DashboardResponseType } from "../models/DashboardResponse";

export type DashboardModel = DashboardResponseType;
export type RevisionInfoModel = DashboardModel["revisionInfo"];

export class DashboardPresenter {

    private readonly service: DashboardService

    constructor(service: DashboardService) {
        this.service = service
    }

    load(): Promise<DashboardModel> {
        return this.service.dashboardData();
    }
}

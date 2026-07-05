import { DashboardPresenter } from "../components/dashboard/services/DashboardPresenter";
import DashboardService from "../components/dashboard/services/DashboardService";
import RevisionService from "../components/dashboard/services/RevisionItemService";
import { RevisionPresnter } from "./presenters/RevisionPresenter";

const revisionItemService = new RevisionService();

const dashboardService = new DashboardService()

export const revisionPresetner = new RevisionPresnter(revisionItemService);

export const dashboardPresenter = new DashboardPresenter(dashboardService);
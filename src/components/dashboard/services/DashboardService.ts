import apiClient from "../../../network/ApiClient.ts";
import { DashboardEndpoint } from "../../../network/Endpoints.ts";
import { DashboardResponse, type DashboardResponseType } from "../models/DashboardResponse.ts";

class DashboardService {

  async getDashboardData(): Promise<DashboardResponseType> {
    const response = await apiClient.get(DashboardEndpoint.dashboard);
    return DashboardResponse.parse(response.data);
  }
}

export default DashboardService;
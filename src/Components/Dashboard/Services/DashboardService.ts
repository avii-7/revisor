import apiClient from "../../../network/ApiClient";
import { DashboardEndpoint } from "../../../network/Endpoints";
import { DashboardResponse, type DashboardResponseType } from "../models/DashboardResponse";

class DashboardService {

  async getDashboardData(): Promise<DashboardResponseType> {
    const response = await apiClient.get(DashboardEndpoint.dashboard);
    return DashboardResponse.parse(response.data);
  }
}

export default DashboardService;
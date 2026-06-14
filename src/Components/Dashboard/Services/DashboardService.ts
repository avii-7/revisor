import apiClient from "../../../Network/ApiClient";
import { DashboardEndpoint } from "../../../Network/Endpoints";
import { DashboardResponse, type DashboardResponseType } from "../Models/DashboardResponse";

class DashboardService {
  
  async getDashboardData(): Promise<DashboardResponseType> {
    const response = await apiClient.get(DashboardEndpoint.dashboard);
    return DashboardResponse.parse(response.data);
  }
}

export default DashboardService;
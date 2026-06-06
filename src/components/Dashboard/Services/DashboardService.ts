import z from "zod";
import apiClient from "../../../Network/ApiClient";
import { DashboardEndpoint } from "../../../Network/Endpoints";
import { DashboardResponse } from "../Models/DashboardResponse";

async function getDashboardData() {
    type schema = z.infer<typeof DashboardResponse>
    const response = await apiClient.get<schema>(DashboardEndpoint.dashboard);
    return DashboardResponse.parse(response.data);
}

export { getDashboardData };

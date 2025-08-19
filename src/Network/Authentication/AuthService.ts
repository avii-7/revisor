import { apiClient } from "../ApiClient";

async function getGoogleOauthUrl() {
    const response = await apiClient.get<string>("auth/google");
    return response.data;
}

export default { getGoogleOauthUrl }
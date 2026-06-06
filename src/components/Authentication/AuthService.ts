import apiClient from "./../../Network/ApiClient";
import { AuthenticationEndpoint } from "./../../Network/Endpoints";

async function getGoogleOauthUrl() {
    const response = await apiClient.get<string>(AuthenticationEndpoint.oauthGoogle);
    return response.data;
}

export { getGoogleOauthUrl };
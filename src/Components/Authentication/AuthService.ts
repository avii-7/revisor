import apiClient from "../../network/ApiClient.ts";
import { AuthenticationEndpoint } from "../../network/Endpoints.ts";

async function getGoogleOauthUrl() {
    const response = await apiClient.get<string>(AuthenticationEndpoint.oauthGoogle);
    return response.data;
}

export { getGoogleOauthUrl };
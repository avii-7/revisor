import apiClient from "../../network/ApiClient";
import { AuthenticationEndpoint } from "../../network/Endpoints";

async function getGoogleOauthUrl() {
    const response = await apiClient.get<string>(AuthenticationEndpoint.oauthGoogle);
    return response.data;
}

export { getGoogleOauthUrl };
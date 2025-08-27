import apiClient from "../ApiClient";
import Endpoint from "../Endpoints";

async function getGoogleOauthUrl() {
    const response = await apiClient.get<string>(Endpoint.oauthGoogle);
    return response.data;
}

export { getGoogleOauthUrl };
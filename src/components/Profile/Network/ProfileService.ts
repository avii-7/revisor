import apiClient from "../../../Network/ApiClient";
import Endpoint  from "../../../Network/Endpoints";
import Profile from "../Models/Profile";

export default class ProfileService {

    async getProfile() {
        const response = await apiClient.get<Profile>(Endpoint.profile);
        return response.data;
    }
}
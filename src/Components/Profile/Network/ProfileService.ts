import apiClient from "../../../network/ApiClient";
import { ProfileEndpoint } from "../../../network/Endpoints";
import ProfileResponse from "../Models/Profile";

export default class ProfileService {
  async getProfile() {
    const response = await apiClient.get<ProfileResponse>(ProfileEndpoint.profile);
    return response.data;
  }
}

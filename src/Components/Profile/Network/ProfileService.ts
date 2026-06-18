import apiClient from "../../../network/ApiClient.ts";
import { ProfileEndpoint } from "../../../network/Endpoints.ts";
import ProfileResponse from "../Models/Profile.ts";

export default class ProfileService {
  async getProfile() {
    const response = await apiClient.get<ProfileResponse>(ProfileEndpoint.profile);
    return response.data;
  }
}

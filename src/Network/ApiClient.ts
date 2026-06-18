import axios from "axios";
import { AuthenticationEndpoint } from "./Endpoints";
import humps from "humps";
import CookieManager, { CookieConstant } from "../utilities/CookieConstant";

const nonJWTEndpoints: string[] = [AuthenticationEndpoint.oauthGoogle];

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (config.url) {
      if (!nonJWTEndpoints.includes(config.url)) {
        const token = CookieManager.get(CookieConstant.jwtToken);
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    if (config.data) {
      config.data = humps.decamelizeKeys(config.data);
    }

    return config;
  },
  (error) => {
    console.log(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {

    const contentType = response.headers["content-type"];

    if (
      response.data &&
      contentType?.toString().includes("application/json")
    ) {
      response.data = humps.camelizeKeys(response.data);
    }

    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      CookieManager.remove(CookieConstant.jwtToken);
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  },
);

export default apiClient;

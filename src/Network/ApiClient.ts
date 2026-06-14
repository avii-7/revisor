import axios from "axios";
import CookieConstant from "../Utilities/CookieConstant";
import { Cookies } from "react-cookie";
import { AuthenticationEndpoint } from "./Endpoints";
import humps from "humps";

const nonJWTEndpoints: string[] = [AuthenticationEndpoint.oauthGoogle];

const cookies = new Cookies();

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
        const token = cookies.get(CookieConstant.jwtToken);
        config.headers.Authorization = `Bearer ${token}`;
      }
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
      cookies.remove(CookieConstant.jwtToken, { path: "/" });
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  },
);

export default apiClient;

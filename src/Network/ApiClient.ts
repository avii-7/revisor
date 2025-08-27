import axios from "axios";
import CookieConstant from "../Utilities/CookieConstant";
import { Cookies } from "react-cookie";
import Endpoint from './Endpoints'

const nonJWTEndpoints: string[] = [Endpoint.oauthGoogle];

const cookies = new Cookies();

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  config => {

    if (config.url) {
      if (!nonJWTEndpoints.includes(config.url)) {
        const token = cookies.get(CookieConstant.jwtToken);
        console.log("token", token);
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config
  }, error => {
    console.log(error);
  });

export default apiClient;
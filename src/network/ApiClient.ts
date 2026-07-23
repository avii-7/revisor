import axios from "axios";
import humps from "humps";
import { HeaderConstantKey, HeaderConstantValue } from "./Endpoints";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    [HeaderConstantKey.contentType]: HeaderConstantValue.applicationJson,
  },
  withCredentials: true
});

apiClient.interceptors.request.use(
  (config) => {
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

    const contentType = response.headers[HeaderConstantKey.contentType];

    if (
      response.data &&
      contentType?.toString().includes(HeaderConstantValue.applicationJson)
    ) {
      response.data = humps.camelizeKeys(response.data);
    }

    return response;
  },
  (error) => { console.log(error); },
);

export default apiClient;

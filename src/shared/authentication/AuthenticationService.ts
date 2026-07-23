import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import apiClient from "../../network/ApiClient.ts";
import { AuthenticationEndpoint } from "../../network/Endpoints.ts";

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export interface ApiError {
    message: string;
    code: string;
}

export class AuthenticationService {

    private refreshPromise: Promise<void> | null = null;

    private expiredHandler?: () => void;

    setAuthenticationExpiredHandler(handler?: () => void) {
        this.expiredHandler = handler;
    }

    configure(apiClient: AxiosInstance) {
        apiClient.interceptors.response.use(
            (response) => response,
            async (error: AxiosError<ApiError>) => {

                const originalRequest = error.config as RetryAxiosRequestConfig;

                if (error.response?.status !== 401 || !originalRequest) {
                    return Promise.reject(error);
                }

                // Don't retry refresh endpoint itself
                if (originalRequest.url?.includes(AuthenticationEndpoint.refreshToken)) {
                    return Promise.reject(error);
                }

                if (originalRequest._retry) {
                    return Promise.reject(error);
                }

                originalRequest._retry = true;

                try {

                    // Someone else already refreshing?
                    if (!this.refreshPromise) {
                        this.refreshPromise = this.refreshAccessToken();
                    }

                    await this.refreshPromise;
                    this.refreshPromise = null;
                    return apiClient(originalRequest);
                }
                catch (refreshError) {
                    this.refreshPromise = null;
                    this.expiredHandler?.();
                    return Promise.reject(refreshError);
                }
            });
    }

    async refreshAccessToken(): Promise<void> {
        await apiClient.post(AuthenticationEndpoint.refreshToken);
    }

    async googleOauthUrl(): Promise<string> {
        const response = await apiClient.get<string>(AuthenticationEndpoint.oauthGoogle);
        return response.data;
    }
}
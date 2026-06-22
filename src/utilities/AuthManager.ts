import CookieManager, { CookieConstant } from "./CookieConstant.ts";

export default class AuthManager {

    static saveToken(token: string): void {
        CookieManager.set(CookieConstant.jwtToken, token);
    }

    static isAuthenticated(): boolean {
        return CookieManager.get(CookieConstant.jwtToken) !== undefined;
    }

    static logout(): void {
        CookieManager.remove(CookieConstant.jwtToken);
        console.log("user logout")
    }
}
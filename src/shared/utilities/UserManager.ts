import CookieManager, { CookiesConstant } from "./CookiesConstant.ts";

export default class UserManager {

    static isAuthenticated(): boolean {
        return CookieManager.get(CookiesConstant.jwtToken) !== undefined &&
            CookieManager.get(CookiesConstant.refreshToken) !== undefined;
    }

    static logout(): void {
        CookieManager.remove(CookiesConstant.jwtToken);
        CookieManager.remove(CookiesConstant.refreshToken);
        console.log("user logout")
    }
}
import { Cookies } from "react-cookie";

export const CookiesConstant = {
    jwtToken: "jwt_token",
    refreshToken: "refresh_token"
} as const;

export type CookieKey = (typeof CookiesConstant)[keyof typeof CookiesConstant];

// class CookieManager {

//     private static readonly COOKIE_OPTIONS = {
//         path: "/",
//         sameSite: "strict" as const,
//     };

//     private static readonly cookies = new Cookies();

//     static get(key: CookieKey): string | undefined {
//         return this.cookies.get(key);
//     }

//     static set(key: CookieKey, value: string): void {
//         this.cookies.set(key, value, CookieManager.COOKIE_OPTIONS);
//     }

//     static remove(key: CookieKey): void {
//         this.cookies.remove(key, CookieManager.COOKIE_OPTIONS);
//     }
// }

// export default CookieManager;
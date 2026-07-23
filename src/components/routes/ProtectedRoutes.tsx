import { Navigate, Outlet } from "react-router";
import { CookiesConstant } from "../../shared/utilities/CookiesConstant";
import { useCookies } from "react-cookie";

export default function ProtectedRoute() {
    const [cookies] = useCookies([CookiesConstant.jwtToken, CookiesConstant.refreshToken]);

    if (!cookies[CookiesConstant.jwtToken] || !cookies[CookiesConstant.refreshToken]) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
}
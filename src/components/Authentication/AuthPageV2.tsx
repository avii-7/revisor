import "./AuthPage.css";
import { FaMicrochip } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { getGoogleOauthUrl } from "./AuthService";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router'
import CookieConstant from "../../Utilities/CookieConstant";

const AuthPage = () => {

    const [cookies] = useCookies<CookieConstant>([CookieConstant.jwtToken]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (cookies.jwtToken) {
            navigate("/");
            return
        }
    }, [cookies.jwtToken, navigate]);

    const handleAuthWithGoogle = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        try {
            const [oauthUrl] = await Promise.all([
                getGoogleOauthUrl(),
                new Promise((resolve) => setTimeout(resolve, 700)),
            ]);
            window.open(oauthUrl, "_self");
        } catch (error) {
            setIsLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-content">
                <div className="login-content-header">
                    <h1 className="login-title">
                        <FaMicrochip className="login-logo" />
                        Revisor
                    </h1>
                    <div className="login-description">Secure access to your workspace</div>
                </div>
                <div className="login-button-container">
                    <button id="login-google" className="login-button" onClick={handleAuthWithGoogle} disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="login-spinner" />
                                Loading...
                            </>
                        ) : (
                            <>
                                <FcGoogle className="google-icon" /> Continue with Google
                            </>
                        )}
                    </button>
                    <div className="login-auth-label">One-click authentication</div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;

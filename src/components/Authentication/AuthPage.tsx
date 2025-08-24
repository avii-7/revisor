import "./AuthPage.css";
import { FaGoogle } from "react-icons/fa";
import AuthService from "../../Network/Authentication/AuthService";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router'
import CookieConstant from "../../Utilities/CookieConstant";

const AuthPage = () => {

    const [cookies] = useCookies([CookieConstant.jwtToken]);
    const navigate = useNavigate();

    useEffect(() => {

        if (cookies.jwtToken) {
            navigate("/");
            return
        }
        
    }, []);

    const handleAuthWithGoogle = async () => {
        const oauthUrl = await AuthService.getGoogleOauthUrl();
        window.open(oauthUrl, "_self");
    }

    return (
        <div className="login-page">
            <div className="login-background">
                <div className="left-semi-circle"></div>
            </div>

            <div className="login-content">
                <div className="login-content-header">
                    <h1 className="login-title">Revisor</h1>
                    <div className="login-description">Revisor is a simple app designed to keeping track of tasks to review and revise.</div>
                </div>
                <div className="login-button-container">
                    <button id="login-google" className="login-button" onClick={handleAuthWithGoogle}>
                        <FaGoogle /> Login with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;
import { v4 as uuidv4 } from "uuid";

import "./AuthPage.css";
import { FaGoogle } from "react-icons/fa";
import getOauthUrl from "../../Services/googleOauth";

const AuthPage = () => {

    const googleOauthSession = uuidv4();

    const handleLoginWithGoogle = () => {
        window.open(getOauthUrl(googleOauthSession), "_self");
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
                    <button id="login-google" className="login-button" onClick={handleLoginWithGoogle}>
                        <FaGoogle /> Login with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;
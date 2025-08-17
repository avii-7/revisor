import React from "react";

import "./LoginPage.css";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {

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
                    <button id="login-google" className="login-button">
                        <FaGoogle style={{ alignContent: "center" }} /> Login with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
// import dotenv from 'dotenv';
// // dotenv.config();

const getOauthUrl = (session: string) => {
    const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";

        const params = new URLSearchParams({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID ?? "",
            redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URI ?? "",
            response_type: "token",
            scope: "https://www.googleapis.com/auth/userinfo.email",
            state: session,
        });

    return `${baseUrl}?${params.toString()}`;
};

export default getOauthUrl;

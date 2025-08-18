// import dotenv from 'dotenv';
// // dotenv.config();

// http://127.0.0.1:8080/api/auth/google
const getOauthUrl = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    return `${baseUrl}auth/google`;
};

export default getOauthUrl;

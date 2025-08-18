import { useEffect } from "react";


const GoogleAuthCallback = () => {

useEffect(() => {
    const hash = window.location.hash;
    console.log("Google OAuth Callback:", hash);
}, []);

  return (
    <div>
      <h1>Google OAuth Callback Page</h1>
    </div>
  );
};

export default GoogleAuthCallback;

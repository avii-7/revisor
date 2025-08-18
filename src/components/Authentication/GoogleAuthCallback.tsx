import { useEffect } from "react";


const GoogleAuthCallback = () => {

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
  }, []);

  return (
    <div>
      <h1>Google OAuth Callback Page</h1>
    </div>
  );
};

export default GoogleAuthCallback;

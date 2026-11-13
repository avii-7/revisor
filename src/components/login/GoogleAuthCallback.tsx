import { useNavigate } from 'react-router'
import { useEffect } from 'react';

const GoogleAuthCallback = () => {

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Auth callback started")
    navigate("/");
  });

  return (
    <div>
      <h1>Redirecting to Home...</h1>
    </div>
  );
};

export default GoogleAuthCallback;

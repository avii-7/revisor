import { useNavigate } from 'react-router'
import { useEffect } from 'react';
import UserManager from '../../shared/utilities/UserManager';

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

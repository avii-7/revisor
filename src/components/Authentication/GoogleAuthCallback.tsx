import { useNavigate, useSearchParams } from 'react-router'
import CookieConstant from '../../Utilities/CookieConstant';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const GoogleAuthCallback = () => {

  const [_, setCookie] = useCookies([CookieConstant.jwtToken]);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setCookie(CookieConstant.jwtToken, token)
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>Redirecting to Home...</h1>
    </div>
  );
};

export default GoogleAuthCallback;

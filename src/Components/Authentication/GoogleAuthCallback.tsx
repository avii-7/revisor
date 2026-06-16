import { useNavigate, useSearchParams } from 'react-router'
import CookieConstant from '../../utilities/CookieConstant';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const GoogleAuthCallback = () => {

  const [, setCookie] = useCookies([CookieConstant.jwtToken]);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setCookie(CookieConstant.jwtToken, token)
      navigate("/");
    }
  }, [navigate, setCookie, token]);

  return (
    <div>
      <h1>Redirecting to Home...</h1>
    </div>
  );
};

export default GoogleAuthCallback;

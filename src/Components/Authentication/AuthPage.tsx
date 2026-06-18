import { FaMicrochip } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { getGoogleOauthUrl } from "./AuthService.ts";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { CookieConstant } from "../../utilities/CookieConstant.ts";
import DotGridBackground from "../common/DotGridBackground.tsx";

const AuthPage = () => {
  const [cookies] = useCookies([CookieConstant.jwtToken]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cookies.jwtToken) {
      navigate("/");
      return;
    }

  }, [cookies.jwtToken, navigate]);

  const handleAuthWithGoogle = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const oauthUrl = await getGoogleOauthUrl();

      console.log("Received OAuth URL:", oauthUrl);

      window.location.href = oauthUrl;
    }
    catch (error) {
      console.error("Error fetching Google OAuth URL:", error);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center overflow-hidden bg-background relative"
      style={{ backgroundImage: "bg-app-gradient" }}
    >
      <DotGridBackground />

      <div className="w-[min(88vw,320px)] flex flex-col gap-8 text-center text-on-surface">
        <div className="flex flex-col items-center gap-4">
          <h1 className="flex items-center justify-center gap-3 text-surface-tint font-bold text-3xl leading-none m-0">
            <FaMicrochip className="text-tertiary-fixed-dim text-2xl" />
            Revisor
          </h1>
          <div className="text-on-surface-variant font-regular text-sm">
            Secure access to your workspace
          </div>
        </div>

        <div className="p-8 bg-surface-container/40 border border-surface-tint/10 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <button
            id="login-google"
            onClick={handleAuthWithGoogle}
            disabled={isLoading}
            className="w-full min-h-[44px] px-4 rounded-[6px] border-1 border-outline-variant/30 bg-surface-container-low/50 text-on-surface text-sm font-semibold flex items-center justify-center gap-3 transition duration-150 hover:bg-surface-dim hover:border-primary disabled:cursor-wait disabled:opacity-80 focus-visible:outline focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-3"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-on-surface-variant border-t-primary animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <FcGoogle className="text-base" /> Continue with Google
              </>
            )}
          </button>

          <div className="relative inline-block mx-auto mt-6 text-xs uppercase font-bold tracking-[0.03em] text-outline-variant after:absolute after:left-1/2 after:top-full after:mt-2 after:-translate-x-1/2 after:h-px after:w-8 after:bg-gradient-to-r after:from-transparent after:via-surface-bright after:to-transparent">
            One-click authentication
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

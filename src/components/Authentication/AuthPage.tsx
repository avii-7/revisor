import { FaMicrochip } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { getGoogleOauthUrl } from "./AuthService";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router'
import CookieConstant from "../../Utilities/CookieConstant";

const AuthPage = () => {

    const [cookies] = useCookies<CookieConstant>([CookieConstant.jwtToken]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (cookies.jwtToken) {
            navigate("/");
            return
        }
    }, [cookies.jwtToken, navigate]);

    const handleAuthWithGoogle = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        try {
             const oauthUrl = await getGoogleOauthUrl()

            window.open(
                oauthUrl,
                "oauthWindow",
                "popup=yes,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=700"
            );
        } 
        catch (error) {
            setIsLoading(false);
        }
    }

    return (
        <div
            className="min-h-screen w-screen flex items-center justify-center overflow-hidden text-[var(--color-on-surface)] bg-[var(--color-background)]"
            style={{
                backgroundImage: "radial-gradient(circle at 50% 50%, rgba(33, 48, 76, 0.42), transparent 36%)",
            }}
        >
            <div className="w-[min(88vw,320px)] text-center text-[var(--color-on-surface)]">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="flex items-center justify-center gap-3 text-[var(--color-surface-bright)] font-bold text-3xl leading-none m-0">
                        <FaMicrochip className="text-[var(--color-primary)] text-2xl" />
                        Revisor
                    </h1>
                    <div className="text-[var(--color-on-surface-variant)] font-semibold text-sm">Secure access to your workspace</div>
                </div>

                <div className="mt-6 p-8 bg-[var(--color-surface-container)] border border-[var(--color-outline)] rounded-lg shadow-[0_22px_70px_rgba(2,8,23,0.36)]">
                    <button
                        id="login-google"
                        onClick={handleAuthWithGoogle}
                        disabled={isLoading}
                        className="w-full min-h-[44px] px-4 rounded-[6px] border-2 border-[var(--color-surface-bright)] bg-transparent text-[var(--color-on-surface)] text-sm font-semibold flex items-center justify-center gap-3 transition duration-150 hover:bg-[var(--color-surface-dim)] hover:border-[var(--color-primary)] disabled:cursor-wait disabled:opacity-80 focus-visible:outline focus-visible:outline-[var(--color-primary)] focus-visible:outline-2 focus-visible:outline-offset-3"
                    >
                        {isLoading ? (
                            <>
                                <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-[var(--color-on-surface-variant)] border-t-[var(--color-primary)] animate-spin" />
                                Loading...
                            </>
                        ) : (
                            <>
                                <FcGoogle className="text-base" /> Continue with Google
                            </>
                        )}
                    </button>

                    <div className="relative inline-block mx-auto mt-6 text-xs uppercase font-bold tracking-[0.03em] text-[var(--color-on-surface-variant)] after:absolute after:left-1/2 after:top-full after:mt-2 after:-translate-x-1/2 after:h-px after:w-8 after:bg-gradient-to-r after:from-transparent after:via-[var(--color-surface-bright)] after:to-transparent">
                        One-click authentication
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;

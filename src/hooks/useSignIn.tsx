import {
    GoogleAuthProvider,
    browserLocalPersistence as rememberMeSession,
    setPersistence,
    signInWithPopup,
    signInWithRedirect,
} from "firebase/auth";
import { useErrorContext } from "../context/ErrorContext";
import errMsg from "../models/resources/errorMsg.json";
import { auth } from "../config/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { NEED_TO_LOGIN } from "../models/constants/cookie";
import { useCookiesContext } from "../context/CookiesContext";
import { useLanguage } from "../i18n/useLanguage";

const useSignIn = (handleStart: () => void) => {
    const { handleError } = useErrorContext();
    const { isLoggedIn, loading, currentUser } = useAuthContext();
    const { setLimitCookie, setRememberMeCookie, removeRememberMeCookie } = useCookiesContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
    const { lang } = useLanguage();

    useEffect(() => {
        console.log("🔄 useEffect: [loading, isLoggedIn, currentUser]", {
            loading,
            isLoggedIn,
            currentUser,
        });

        if (!loading && isLoggedIn && currentUser) {
            console.log("✅ Authenticated, calling handleStart()");
            handleStart();
        }
    }, [loading, isLoggedIn, currentUser]);

    const signInWithGoogle = async () => {
        console.log("👆 CLICK received — starting sign-in");

        const provider = new GoogleAuthProvider();
        const isMobile = /Android|iPhone|iPad|webOS|BlackBerry|Mobile|Tablet/i.test(navigator.userAgent);

        try {
            setIsLoading(true);
            setBtnDisabled(true);
            setLimitCookie(NEED_TO_LOGIN);
            setRememberMeCookie();
            await setPersistence(auth, rememberMeSession);
            console.log("✅ Persistence set");

            if (isMobile) {
                console.log("📱 Mobile device — using redirect sign-in");
                await signInWithRedirect(auth, provider);
            } else {
                console.log("💻 Desktop device — using popup sign-in");
                await signInWithPopup(auth, provider);
                console.log("🎉 signInWithPopup: success");
            }
        } catch (error: any) {
            console.error("❌ Error in signInWithGoogle:", error);
            const errorStr = error?.toString?.() || "";
            if (
                !errorStr.includes("auth/popup-closed-by-user") &&
                !errorStr.includes("auth/cancelled-popup-request")
            ) {
                handleError(errMsg[lang].google.message);
            }
            removeRememberMeCookie();
            setBtnDisabled(false);
            setIsLoading(false);
        }
    };

    return { signInWithGoogle, isLoading, btnDisabled };
};

export default useSignIn;

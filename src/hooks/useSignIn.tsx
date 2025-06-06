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
        console.log("📌 signInWithGoogle called");
        console.trace(); // מדפיס את ה-stack כדי לראות מי קרא לפונקציה

        const provider = new GoogleAuthProvider();
        console.log("🚀 signInWithGoogle: clicked");

        setLimitCookie(NEED_TO_LOGIN);

        try {
            if (!auth) {
                console.error("❌ Auth not initialized");
                return;
            }

            console.log("🧠 Setting persistence...");
            setIsLoading(true);
            setBtnDisabled(true);
            setRememberMeCookie();
            await setPersistence(auth, rememberMeSession);
            console.log("✅ Persistence set — trying popup...");

            try {
                await signInWithPopup(auth, provider);
                console.log("🎉 signInWithPopup: success");
            } catch (popupError: any) {
                const errorCode = popupError?.code;
                console.warn("⚠️ signInWithPopup error:", errorCode);

                if (errorCode === "auth/popup-blocked") {
                    console.log("🔁 Fallback to signInWithRedirect...");
                    await signInWithRedirect(auth, provider);
                    return;
                }

                throw popupError;
            }
        } catch (error) {
            handleErrors(error);
            setIsLoading(false);
        }
    };

    const handleErrors = (error: any) => {
        console.error("❌ Error in signInWithGoogle:", error);
        const errorStr = (error as unknown as string).toString();
        if (
            !errorStr.includes("auth/popup-closed-by-user") &&
            !errorStr.includes("auth/cancelled-popup-request")
        ) {
            handleError(errMsg[lang].google.message);
        }
        removeRememberMeCookie();
        setBtnDisabled(false);
        setIsLoading(false);
    };

    return { signInWithGoogle, isLoading, btnDisabled };
};

export default useSignIn;

/**
 * Handles Google sign-in with popup-first strategy and redirect fallback.
 * Uses error.code for cleaner fallback logic and manages UI state and flow.
 */
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
        if (!loading && isLoggedIn && currentUser) {
            handleStart();
        }
    }, [loading, isLoggedIn, currentUser]);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        setLimitCookie(NEED_TO_LOGIN);

        try {
            if (!auth) {
                console.error("Auth not initialized");
                return;
            }

            setIsLoading(true);
            setBtnDisabled(true);
            setRememberMeCookie();
            await setPersistence(auth, rememberMeSession);

            try {
                await signInWithPopup(auth, provider);
            } catch (popupError: any) {
                console.warn("Popup failed, trying redirect fallback:", popupError);
                const errorCode = popupError?.code;

                const isSafeToFallback =
                    errorCode !== "auth/popup-closed-by-user" &&
                    errorCode !== "auth/cancelled-popup-request";

                if (isSafeToFallback) {
                    await signInWithRedirect(auth, provider);
                } else {
                    throw popupError;
                }
            }

        } catch (error) {
            handleErrors(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleErrors = (error: any) => {
        console.error("Error in signInWithGoogle:", error);
        const errorCode = error?.code;

        if (
            errorCode !== "auth/popup-closed-by-user" &&
            errorCode !== "auth/cancelled-popup-request"
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

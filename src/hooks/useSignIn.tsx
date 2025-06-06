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
                return; // console.error("Auth not initialized");
            }

            setIsLoading(true);
            setBtnDisabled(true);
            setRememberMeCookie();
            await setPersistence(auth, rememberMeSession);

            try {
                await signInWithPopup(auth, provider);
            } catch (popupError: any) {
                const errorCode = popupError?.code;

                const isSafeToFallback =
                    (errorCode as unknown as string)
                        .toString().includes(`(auth/popup-closed-by-user)`) === false &&
                    (errorCode as unknown as string)
                        .toString().includes(`(auth/cancelled-popup-request)`) === false;

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
        const errorCode = error?.code; // console.error("Error in signInWithGoogle:", error);

        if (
            (error as unknown as string).toString().includes(`(auth/popup-closed-by-user)`) === false &&
            (error as unknown as string).toString().includes(`(auth/cancelled-popup-request)`) === false
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

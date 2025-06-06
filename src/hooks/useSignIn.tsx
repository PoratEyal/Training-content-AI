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
        console.log("🌀 useEffect [Auth]: loading =", loading, "isLoggedIn =", isLoggedIn, "currentUser =", currentUser);
        if (!loading && isLoggedIn && currentUser) {
            console.log("✅ Authenticated — calling handleStart()");
            handleStart();
        }
    }, [loading, isLoggedIn, currentUser]);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        console.log("👉 signInWithGoogle called");
        setLimitCookie(NEED_TO_LOGIN);

        try {
            if (!auth) {
                console.error("❌ Auth not initialized");
                return;
            }

            setIsLoading(true);
            setBtnDisabled(true);
            setRememberMeCookie();

            console.log("🔐 Setting persistence");
            await setPersistence(auth, rememberMeSession);

            try {
                console.log("🌐 Trying signInWithPopup");
                await signInWithPopup(auth, provider);
                console.log("✅ signInWithPopup success");
            } catch (popupError: any) {
                const errorCode = popupError?.code;
                console.warn("⚠️ signInWithPopup failed:", errorCode);

                if (errorCode === "auth/popup-blocked") {
                    console.log("🔁 Falling back to signInWithRedirect");
                    await signInWithRedirect(auth, provider);
                    return;
                }

                throw popupError;
            }
        } catch (error) {
            console.error("❌ Caught error in signInWithGoogle:", error);
            handleErrors(error);
            setIsLoading(false);
        }
    };

    const handleErrors = (error: any) => {
        console.error("❗ handleErrors called with:", error);
        const errorStr = (error as unknown as string).toString();

        if (
            !errorStr.includes("auth/popup-closed-by-user") &&
            !errorStr.includes("auth/cancelled-popup-request")
        ) {
            console.warn("🛑 Displaying user-friendly error message");
            handleError(errMsg[lang].google.message);
        } else {
            console.log("ℹ️ Ignored popup close/cancel error");
        }

        removeRememberMeCookie();
        setBtnDisabled(false);
        setIsLoading(false);
    };

    return { signInWithGoogle, isLoading, btnDisabled };
};

export default useSignIn;

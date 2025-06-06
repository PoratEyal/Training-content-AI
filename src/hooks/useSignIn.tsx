import {
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useErrorContext } from "../context/ErrorContext";
import { auth } from "../config/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useCookiesContext } from "../context/CookiesContext";
import { useLanguage } from "../i18n/useLanguage";

const useSignIn = (handleStart: () => void) => {
    const { handleError } = useErrorContext();
    const { isLoggedIn, loading, currentUser } = useAuthContext();
    const { lang } = useLanguage();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
    const { setLimitCookie, setRememberMeCookie, removeRememberMeCookie } = useCookiesContext();

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
        console.log("🟡 CLICK — starting basic popup sign-in");

        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            console.log("✅ signInWithPopup SUCCESS:", result);
        } catch (err: any) {
            console.error("❌ signInWithPopup FAILED:", err?.code || err);
        }
    };

    return { signInWithGoogle, isLoading, btnDisabled };
};

export default useSignIn;

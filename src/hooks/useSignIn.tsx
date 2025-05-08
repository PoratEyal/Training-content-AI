import {
    GoogleAuthProvider,
    browserLocalPersistence as rememberMeSession,
    setPersistence,
    signInWithPopup,
    signInWithRedirect,
} from "firebase/auth";
import { useErrorContext } from "../context/ErrorContext";
import errMsg from "../models/resources/he/errorMsg.json";
import { auth } from "../config/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { NEED_TO_LOGIN } from "../models/constants/cookie";
import { useCookiesContext } from "../context/CookiesContext";


const useSignIn = (handleStart: ()=> void) => {
    const { handleError } = useErrorContext();
    const { isLoggedIn, loading, currentUser } = useAuthContext();
    const { setLimitCookie, setRememberMeCookie, removeRememberMeCookie } = useCookiesContext();
    const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|IEMobile|Opera Mini|Windows Phone|webOS|Kindle|Mobile|Tablet/i.test(navigator.userAgent);    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (!loading && isLoggedIn && currentUser){
            handleStart();
        };
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
            if (isMobile) {
                await signInWithRedirect(auth, provider);
            } else {
                await signInWithPopup(auth, provider);
            }
        } catch (error) {
            handleErrors(error);
            setIsLoading(false);
        }
    };


    const handleErrors = (error) => {
        console.error("Error in signInWithGoogle: ", error);
        if (
            (error as unknown as string).toString().includes(`(auth/popup-closed-by-user)`) ===
                false &&
            (error as unknown as string).toString().includes(`(auth/cancelled-popup-request)`) ===
                false
        ) {
            handleError(errMsg.google.message);
        }
        removeRememberMeCookie();
        setBtnDisabled(false);
        setIsLoading(false);
    };

    return { signInWithGoogle, isLoading, btnDisabled };

}

export default useSignIn;
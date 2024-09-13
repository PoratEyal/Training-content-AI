import {
    GoogleAuthProvider,
    browserLocalPersistence,
    setPersistence,
    signInWithPopup,
    signInWithRedirect,
} from "firebase/auth";
import { useErrorContext } from "../context/ErrorContext";
import errMsg from "../models/resources/errorMsg.json";
import { auth } from "../config/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { GUEST_LIMIT_VALUE } from "../models/constants/cookie";


const useSignIn = (handleStart: ()=> void) => {
    const { handleError } = useErrorContext();
    const { isLoggedIn, loading, currentUser, setLimitCookie } = useAuthContext();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const [isLoading, setIsLoading] = useState<boolean>(loading ? true : false);
    const [btnDisabled, setBtnDisabled] = useState<boolean>(loading ? true : false);

    useEffect(() => {
        if (!loading && isLoggedIn && currentUser){
            handleStart();
        };
    }, [loading, isLoggedIn, currentUser]);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        setLimitCookie(GUEST_LIMIT_VALUE);
        
        try {
            if (!auth) {
                console.error("Auth not initialized");
                return;
            }
            setBtnDisabled(true);
            await setPersistence(auth, browserLocalPersistence);
            if (isMobile) {
                await signInWithRedirect(auth, provider);
            } else {
                const userResult = await signInWithPopup(auth, provider);
                userResult && setIsLoading(true);
            }
        } catch (error) {
            handleErrors(error);
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
        setBtnDisabled(false);
        setIsLoading(false);
    };

    return { signInWithGoogle, isLoading, btnDisabled };

}

export default useSignIn;
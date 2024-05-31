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
import { useEffect, useRef, useState } from "react";

const useSignIn = (handleStart, loadingText, loggedInText, notLoggedInText) => {
    const { handleError } = useErrorContext();
    const { isLoggedIn, loading, currentUser } = useAuthContext();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const lockSignInRef = useRef<any>(false);
    const [signInBtnText, setSignInBtnText] = useState<string>(
        isLoggedIn ? loggedInText : notLoggedInText,
    );
    const [btnLoading, setBtnLoading] = useState<boolean>(loading ? true : false);
    const [signInDisabled, setSignInDisabled] = useState<boolean>(loading ? true : false);

    useEffect(() => {
        if (!loading && isLoggedIn && currentUser) handleStart();
        //TODO: lockSignInRef is false every time
        if (!lockSignInRef.current) {
            setSignInBtnText(loading ? loadingText : isLoggedIn ? loggedInText : notLoggedInText);
            setSignInDisabled(loading ? true : false);
            setBtnLoading(loading ? true : false);
        }
    }, [loading, isLoggedIn, currentUser]);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            setSignInBtnText(loadingText);
            setSignInDisabled(true);
            lockSignInRef.current = true;
            if (!auth) {
                console.error("Firebase auth not initialized");
                return;
            }

            await setPersistence(auth, browserLocalPersistence);
            if (isMobile) {
                await signInWithRedirect(auth, provider);
            } else {
                const userResult = await signInWithPopup(auth, provider);
                userResult && setBtnLoading(true);
            }
        } catch (error) {
            handleErrors(error);
        }
    };

    const handleErrors = (error) => {
        console.log("Error in signInWithGoogle: ", error);
        if (
            (error as unknown as string).toString().includes(`(auth/popup-closed-by-user)`) ===
                false &&
            (error as unknown as string).toString().includes(`(auth/cancelled-popup-request)`) ===
                false
        ) {
            handleError(errMsg.google.message);
        }
        setSignInBtnText(isLoggedIn ? loggedInText : notLoggedInText);
        setSignInDisabled(false);
        setBtnLoading(false);
        lockSignInRef.current = false;
    };

    return { signInBtnText, signInDisabled, btnLoading, signInWithGoogle };
};

export default useSignIn;

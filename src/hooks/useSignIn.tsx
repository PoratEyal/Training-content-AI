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
import Session from "../utils/sessionStorage";
import { SessionKey } from "../models/enum/session";

const useSignIn = (handleStart, loadingText, loggedInText, notLoggedInText) => {
    const { handleError } = useErrorContext();
    const { isLoggedIn, loading, currentUser } = useAuthContext();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const [signInBtnText, setSignInBtnText] = useState<string>(
        isLoggedIn ? loggedInText : notLoggedInText,
    );
    const [btnLoading, setBtnLoading] = useState<boolean>(loading ? true : false);
    const [signInDisabled, setSignInDisabled] = useState<boolean>(loading ? true : false);

    useEffect(() => {
        if (!loading && isLoggedIn && currentUser){
            Session.remove(SessionKey.SIGNIN);
            handleStart();
        };
        const signInRef = Session.get(SessionKey.SIGNIN);
        if(signInRef && (signInRef as boolean) === true){
            setSignInBtnText(loadingText);
            setSignInDisabled(true);
            setBtnLoading(true);
        } else {
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
            if (!auth) {
                console.error("Auth not initialized");
                return;
            }
            await setPersistence(auth, browserLocalPersistence);
            if (isMobile) {
                Session.set(SessionKey.SIGNIN, true);
                await signInWithRedirect(auth, provider);
            } else {
                const userResult = await signInWithPopup(auth, provider);
                userResult && setBtnLoading(true);
            }
        } catch (error) {
            Session.remove(SessionKey.SIGNIN);   
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
    };

    return { signInBtnText, signInDisabled, btnLoading, signInWithGoogle };
};

export default useSignIn;

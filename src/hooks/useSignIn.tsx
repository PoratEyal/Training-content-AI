import {
    GoogleAuthProvider,
    browserLocalPersistence,
    setPersistence,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
} from "firebase/auth";
import { initRawUser } from "../utils/user";
import { fetchCreateNewUser } from "../utils/fetch";
import { useErrorContext } from "../context/ErrorContext";
import errMsg from "../models/resources/errorMsg.json";
import { auth } from "../config/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useContentContext } from "../context/ContentContext";
//https://firebase.google.com/docs/auth/web/redirect-best-practices

const useSignIn = (handleStart, loadingText, loggedInText, notLoggedInText) => {
    const { data } = useContentContext();
    const { handleError } = useErrorContext();
    const { isLoggedIn, loading, currentUser, setUser } = useAuthContext();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const [signInBtnText, setSignInBtnText] = useState<string>(
        isLoggedIn ? loggedInText : notLoggedInText,
    );
    const [signInDisabled, setSignInDisabled] = useState<boolean>(loading ? true : false);

    useEffect(() => {
        //TODO: need to add data?
        if (!loading && isLoggedIn && currentUser) handleStart();
        setSignInBtnText(loading ? loadingText : isLoggedIn ? loggedInText : notLoggedInText);
        setSignInDisabled(loading ? true : false);
    }, [loading, isLoggedIn]);

    useEffect(() => {
        const handleRedirectResult = async () => {
            try {
                const userResult = await getRedirectResult(auth);
                userResult && (await ifNewUserLoggedIn(userResult.user));
            } catch (error) {
                handleErrors(error);
            }
        };

        isMobile && handleRedirectResult();
    }, [isMobile, auth]);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            setSignInBtnText(loadingText);
            setSignInDisabled(true);
            if (!auth) {
                console.error("Firebase auth not initialized");
                return;
            }

            await setPersistence(auth, browserLocalPersistence);
            if (isMobile) {
                await signInWithRedirect(auth, provider);
            } else {
                const userResult = await signInWithPopup(auth, provider);
                userResult && (await ifNewUserLoggedIn(userResult.user));
            }
        } catch (error) {
            handleErrors(error);
        }
    };

    const ifNewUserLoggedIn = async (user) => {
        const rawUser = initRawUser(user);
        const response = await fetchCreateNewUser({ rawUser });
        setUser(response.user);
        // handleStart();
    };

    const handleErrors = (error) => {
        console.log("Error in signInWithGoogle: ", error);
        if (!(error as unknown as string).toString().includes("(auth/popup-closed-by-user)") || 
            !(error as unknown as string).toString().includes("(auth/cancelled-popup-request)")) {
            handleError(errMsg.google.message);
        }
        setSignInBtnText(isLoggedIn ? loggedInText : notLoggedInText);
        setSignInDisabled(false);
    };

    return { signInBtnText, signInDisabled, signInWithGoogle };
};

export default useSignIn;

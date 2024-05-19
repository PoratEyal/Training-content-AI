import {
    GoogleAuthProvider,
    browserLocalPersistence,
    setPersistence,
    signInWithPopup,
} from "firebase/auth";
import { initRawUser } from "../utils/user";
import { fetchCreateNewUser } from "../utils/fetch";
import { useErrorContext } from "../context/ErrorContext";
import errMsg from "../models/resources/errorMsg.json";
import { auth } from "../config/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useContentContext } from "../context/ContentContext";

const useSignIn = (handleStart, loadingText, loggedInText, notLoggedInText) => {
    const { data } = useContentContext();
    const { handleError } = useErrorContext();
    const { isLoggedIn, loading } = useAuthContext();

    const [signInBtnText, setSignInBtnText] = useState<string>(
        isLoggedIn ? loggedInText : notLoggedInText,
    );
    const [signInDisabled, setSignInDisabled] = useState<boolean>(loading ? true : false);

    useEffect(() => {
        if (!loading && isLoggedIn && data) handleStart();
        setSignInBtnText(isLoggedIn ? loggedInText : notLoggedInText);
        setSignInDisabled(loading ? true : false);
    }, [loading, isLoggedIn]);

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
            const userResult = await signInWithPopup(auth, provider);
            if (userResult) {
                const rawUser = initRawUser(userResult.user);
                await fetchCreateNewUser({ rawUser });
                handleStart();
            }
        } catch (error) {
            console.log("Error in signInWithGoogle: ", error);
            if (!(error as unknown as string).toString().includes("(auth/popup-closed-by-user)")) {
                handleError(errMsg.google.message);
            }
            setSignInBtnText(isLoggedIn ? loggedInText : notLoggedInText);
            setSignInDisabled(true);
        }
    };

    return { signInBtnText, signInDisabled, signInWithGoogle };
};

export default useSignIn;

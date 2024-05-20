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

const useSignIn = (handleStart, loadingText, loggedInText, notLoggedInText) => {
    const { data } = useContentContext();
    const { handleError } = useErrorContext();
    const { isLoggedIn, loading, setUser } = useAuthContext();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const [err, setErr] = useState<string[]>([]);

    const [signInBtnText, setSignInBtnText] = useState<string>(
        isLoggedIn ? loggedInText : notLoggedInText,
    );
    const [signInDisabled, setSignInDisabled] = useState<boolean>(loading ? true : false);

    useEffect(() => {
        console.log("useSignIn useEffect loading", loading)
        console.log("useSignIn useEffect isLoggedIn", isLoggedIn)
        console.log("useSignIn useEffect data", data)
        // if (!loading && isLoggedIn && data) handleStart();
        if (!loading && isLoggedIn && data) console.log("useSignIn useEffect handleStart")
        setSignInBtnText(isLoggedIn ? loggedInText : notLoggedInText);
        setSignInDisabled(loading ? true : false);
    }, [loading, isLoggedIn]);

    useEffect(() => {
        const handleRedirectResult = async () => {
            try {
                const userResult = await getRedirectResult(auth);
                if(userResult){
                    setErr(prev => {
                        prev.push(`enter google sign in mobile return ${userResult?.providerId}, ${userResult?.operationType}, ${JSON.stringify(userResult?.user)}\n`)
                        return prev
                    })
                }
                userResult && (await ifNewUserLoggedIn(userResult.user));
            } catch (error) {
                setErr(prev => {
                    prev.push(`enter mobile error- ${(error as unknown as string).toString()}\n`)
                    return prev
                })
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
                setErr(prev => {
                    prev.push("enter google sign in mobile")
                    return prev
                })
                await signInWithRedirect(auth, provider);
            } else {
                const userResult = await signInWithPopup(auth, provider);
                setErr(prev => {
                    prev.push(`enter google sign in desktop ${userResult?.providerId}\n`)
                    return prev
                })
                userResult && (await ifNewUserLoggedIn(userResult.user));
            }
        } catch (error) {
            setErr(prev => {
                prev.push(`first error- ${(error as unknown as string).toString()}\n`)
                return prev
            })
            handleErrors(error);
        }
    };

    const ifNewUserLoggedIn = async (user) => {
        const rawUser = initRawUser(user);
        const response = await fetchCreateNewUser({ rawUser });
        setErr(prev => {
            prev.push(`create new user ${response?.user?.email}\n`)
            return prev
        })
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
        setSignInDisabled(true);
    };

    return { signInBtnText, signInDisabled, signInWithGoogle, err };
};

export default useSignIn;

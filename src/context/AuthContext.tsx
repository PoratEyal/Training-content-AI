/**
 * Provides global authentication context using Firebase.
 * Tracks user login state, handles sign-in via redirect, 
 * initializes user data, and manages logout and "what's new" messages.
 */
import { useEffect, createContext, useState, useContext, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { signInNow } from "../utils/signInNow";
import { fetchCreateNewUser, fetchGetMsg } from "../utils/fetch";
import { addSessionData } from "../utils/movment";
import { initRawUser } from "../utils/user";
import { useErrorContext } from "./ErrorContext";
import { useCookiesContext } from "./CookiesContext";
import { useLanguage } from "../i18n/useLanguage";
import { GoogleUser, User } from "../models/types/user";
import { NEED_TO_LOGIN } from "../models/constants/cookie";
import msg from "../models/resources/errorMsg.json";


export type AuthContextType = {
    currentUser: User | undefined;
    isLoggedIn: boolean;
    loading: boolean;
    setIsSendMsg: () => void;
    logout: () => Promise<void>;
    whatsNewMsg: string;
    setCurrentUser: (user: User) => void;
};

export const defaultAuthContext: AuthContextType = {
    currentUser: null,
    isLoggedIn: false,
    loading: true,
    setIsSendMsg: () => { },
    logout: async () => { },
    whatsNewMsg: "",
    setCurrentUser: () => { },
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { handleError } = useErrorContext();
    const { cookieLimit, setLimitCookie } = useCookiesContext();
    const [currentUser, setCurrentUser] = useState<User | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [whatsNewMsg, setWhatsNewMsg] = useState<string>("");
    const [redirectFailed, setRedirectFailed] = useState<boolean>(false);
    const { lang } = useLanguage();

    useEffect(() => {                                                           // Listen to connect status in Firebase (Login/Logout)
        const unsubscribe = onAuthStateChanged(auth, (user) => {                // Unsubscribe is a common Firebase name to unsubscribe from listening to him
            if (!user && document.referrer?.includes("accounts.google")) {      // Fail status
                setRedirectFailed(true);
            }
            initializeUser(user);                                               // Succecss Login
        });

        return () => {
            if (typeof unsubscribe === "function") {
                unsubscribe();
            }
        };
    }, []);

    const initializeUser = async (user: any) => {           // Called from AuthContext.useEffect and keep current User Data
        try {
            if (user && (user as GoogleUser)?.uid) {
                let resultUser: User | undefined = undefined;
                const rawUser = initRawUser(user);
                const response = await fetchCreateNewUser({ rawUser }, lang);

                if (response.user) {
                    resultUser = response.user;
                }

                if (resultUser) {
                    if (resultUser.movement) {
                        const { grade, amount, gender, movement } = resultUser.movement;
                        addSessionData(lang, movement, grade, amount, gender);
                    }
                    setCurrentUser(resultUser);
                    await checkIfNeedToSendMsg(resultUser);
                    setIsLoggedIn(true);
                    if (cookieLimit !== NEED_TO_LOGIN) setLimitCookie(NEED_TO_LOGIN);
                    return;
                }

                setCurrentUser(undefined);
                setIsLoggedIn(false);
            }
        } catch (error) {
            handleError(msg[lang].google.message);
        } finally {
            setLoading(false);
        }
    };

    const blockRef = useRef<boolean>(true);

    const checkIfNeedToSendMsg = async (user: User) => {    // called from AuthContext.initializeUser
        if (user.isSendMsg && blockRef.current) {
            const result = await fetchGetMsg(lang);
            if (result.result === "success" && result.msg) {
                const localizedMsg = lang === "en" ? result.msg.textEn : result.msg.textHe;
                setWhatsNewMsg(localizedMsg);
                blockRef.current = false;
            }
        }
    };

    const setIsSendMsg = () => {                            // called from AuthContext
        setCurrentUser((prev) => {
            return prev ? { ...prev, isSendMsg: false } : prev;
        });
    };

    const logout = async () => {
        try {
            await auth.signOut();
            setCurrentUser(undefined);
            setIsLoggedIn(false);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
            await signInNow(auth);  // Re-Connect
        }
    };


    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isLoggedIn,
                loading,
                logout,
                setIsSendMsg,
                whatsNewMsg,
                setCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

/**
 * for make getRedirectResult on localhost
 * https://stackoverflow.com/questions/77270210/firebase-onauthstatechanged-user-returns-null-when-on-localhost
 * disable chrome://flags/#third-party-storage-partitioning (found it on default)
 */
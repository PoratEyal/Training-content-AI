/**
 * Provides global authentication context using Firebase.
 * Tracks user login state, handles sign-in via redirect, 
 * initializes user data, and manages logout and "what's new" messages.
 */
import { useEffect, createContext, useState, useContext, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { fetchCreateNewUser, fetchGetMsg } from "../utils/fetch";
import { fetchUpdateLastLogin } from "../utils/fetch";
import { addSessionData } from "../utils/movment";
import { initRawUser } from "../utils/user";
import { useCookiesContext } from "./CookiesContext";
import { useLanguage } from "../i18n/useLanguage";
import { GoogleUser, User } from "../models/types/user";
import { NEED_TO_LOGIN } from "../models/constants/cookie";
import msg from "../models/resources/errorMsg.json";
import { logEvent } from "../utils/logEvent";


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
    const { cookieLimit, setLimitCookie } = useCookiesContext();
    const [currentUser, setCurrentUser] = useState<User | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [whatsNewMsg] = useState<string>("");
    const [redirectFailed, setRedirectFailed] = useState<boolean>(false);
    const { lang } = useLanguage();

    useEffect(() => {                                                           // Logged-in status in Firebase
        const unsubscribe = onAuthStateChanged(auth, (user) => {                // "Unsubscribe" = common Firebase name to stop listening to it

            if (user)
                initializeUser(user);
            else {
                if (cookieLimit) {          // cleanup: set limit cookie to a "must login" value
                    const lastWeek = new Date()
                    lastWeek.setDate(lastWeek.getDate() - 7)
                    setLimitCookie(lastWeek.toString())
                }
                if (document.referrer?.includes("accounts.google")) {           // Those 2 line are redundent but left as legacy 2be on the safe side
                    logEvent("[AuthContext.useEffect]: It’s highly unlikely that this block is ever reached.", "guest");
                    setRedirectFailed(true);
                }
            }
        });

        return () => {
            if (typeof unsubscribe === "function") {
                unsubscribe();
            }
        };
    }, []);

    //
    // initialize User Data, keep current User Data
    //
    const initializeUser = async (user: any) => {
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

                    //await checkIfNeedToSendMsg(resultUser);   // WhatsNew Message - Currently unused

                    setIsLoggedIn(true);

                    if (cookieLimit !== NEED_TO_LOGIN)
                        setLimitCookie(NEED_TO_LOGIN);

                    fetchUpdateLastLogin().catch((e) => {       // Keep "lastLogin" in DB
                        logEvent("[AuthContext.initializeUser]: Failed to update lastLogin in DB: " + e, resultUser?.email);
                    });

                    return;
                }

                setCurrentUser(undefined);
                setIsLoggedIn(false);
            }
        } catch (error) {
            logEvent("[AuthContext.initializeUser]: Failed to initialize User: " + msg[lang].google.message, "guest");

        } finally {
            setLoading(false);  // Used for an error scenario and sets the profile menu enabled
        }
    };

    const blockRef = useRef<boolean>(true);

    /*
    const checkIfNeedToSendMsg = async (user: User) => {    // WhatsNew Message - Currently unused
        if (user.isSendMsg && blockRef.current) {
            const result = await fetchGetMsg(lang);
            if (result.result === "success" && result.msg) {
                const localizedMsg = lang === "en" ? result.msg.textEn : result.msg.textHe;
                setWhatsNewMsg(localizedMsg);
                blockRef.current = false;
            }
        }
    };
    */

    const setIsSendMsg = () => {                            // WhatsNew Message - Currently unused
        setCurrentUser((prev) => {
            return prev ? { ...prev, isSendMsg: false } : prev;
        });
    };

    //
    // Logout
    //
    const logout = async () => {
        try {
            if (cookieLimit) {  // set limit cookie to a "must login" value
                const lastWeek = new Date()
                lastWeek.setDate(lastWeek.getDate() - 7)
                setLimitCookie(lastWeek.toString())
            }
            await auth.signOut();
            setCurrentUser(undefined);
            setIsLoggedIn(false);
        } catch (error) {
            logEvent("[AuthContext.logout]: Logout Error, " + error, "guest");
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
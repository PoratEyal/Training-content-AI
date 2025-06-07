/**
 * Provides global authentication context using Firebase.
 * Tracks user login state, handles sign-in via redirect, 
 * initializes user data, and manages logout and "what's new" messages.
 */
import { useEffect, createContext, useState, useContext, useRef } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { GoogleUser, User } from "../models/types/user";
import { fetchCreateNewUser, fetchGetMsg } from "../utils/fetch";
import { useErrorContext } from "./ErrorContext";
import { addSessionData } from "../utils/movment";
import { NEED_TO_LOGIN } from "../models/constants/cookie";
import { initRawUser } from "../utils/user";
import msg from "../models/resources/errorMsg.json";
import { useCookiesContext } from "./CookiesContext";
import { useLanguage } from "../i18n/useLanguage";

export type AuthContextType = {
    currentUser: User | undefined;
    isLoggedIn: boolean;
    loading: boolean;
    setIsSendMsg: () => void;
    logout: () => Promise<void>;
    whatsNewMsg: string;
};

export const defualtAuthContext: AuthContextType = {
    currentUser: null,
    isLoggedIn: false,
    loading: true,
    setIsSendMsg: () => { },
    logout: async () => { },
    whatsNewMsg: "",
};

export const AuthContext = createContext<AuthContextType>(defualtAuthContext);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { handleError } = useErrorContext();
    const { cookieLimit, setLimitCookie, removeRememberMeCookie } = useCookiesContext();
    const [currentUser, setCurrentUser] = useState<User | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [whatsNewMsg, setWhatsNewMsg] = useState<string>("");
    const [redirectFailed, setRedirectFailed] = useState<boolean>(false);
    const { lang } = useLanguage();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user && document.referrer?.includes("accounts.google")) {
                setRedirectFailed(true);
            }
            initializeUser(user);
        });

        return () => {
            if (typeof unsubscribe === "function") {
                unsubscribe();
            }
        };
    }, []);

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
    const checkIfNeedToSendMsg = async (user: User) => {
        if (user.isSendMsg && blockRef.current) {
            const result = await fetchGetMsg(lang);
            if (result.result === "success" && result.msg) {
                const localizedMsg = lang === "en" ? result.msg.textEn : result.msg.textHe;
                setWhatsNewMsg(localizedMsg);
                blockRef.current = false;
            }
        }
    };

    const setIsSendMsg = () => {
        setCurrentUser((prev) => {
            return prev ? { ...prev, isSendMsg: false } : prev;
        });
    };

    const logout = async () => {
        try {
            await auth.signOut();
            removeRememberMeCookie();
            setCurrentUser(undefined);
            setIsLoggedIn(false);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
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
            }}
        >
            {children}
            {redirectFailed && (
                <div
                    style={{
                        position: "fixed",
                        bottom: 16,
                        left: 16,
                        right: 16,
                        padding: 12,
                        backgroundColor: "#fee",
                        color: "#900",
                        border: "1px solid #f99",
                        borderRadius: 8,
                        textAlign: "center",
                        fontSize: 14,
                        zIndex: 9999,
                    }}
                >
                    ⚠️ We encountered a problem logging in with Google. Try using incognito mode or a different browser.
                </div>
            )}
        </AuthContext.Provider>
    );
};

/**
 * for make getRedirectResult on localhost
 * https://stackoverflow.com/questions/77270210/firebase-onauthstatechanged-user-returns-null-when-on-localhost
 * disable chrome://flags/#third-party-storage-partitioning (found it on default)
 */
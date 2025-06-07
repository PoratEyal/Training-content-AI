import { useEffect, createContext, useState, useContext, useRef } from "react";
import { auth } from "../config/firebase";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
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
    const isMobile =
        /iPhone|iPad|iPod|Android|BlackBerry|IEMobile|Opera Mini|Windows Phone|webOS|Kindle|Mobile|Tablet/i.test(
            navigator.userAgent
        );
    const { handleError } = useErrorContext();
    const { cookieLimit, setLimitCookie, removeRememberMeCookie } = useCookiesContext();
    const [currentUser, setCurrentUser] = useState<User | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [whatsNewMsg, setWhatsNewMsg] = useState<string>("");
    const { lang } = useLanguage();

    useEffect(() => {
        let unsubscribe: any;

        const handleRedirectResult = async () => {
            console.log("📲 handleRedirectResult: checking redirect login result...");
            try {
                const userResult = await getRedirectResult(auth);
                console.log("🔍 getRedirectResult:", userResult);
                if (userResult?.user) {
                    console.log("✅ userResult.user found — calling initializeUser");
                    await initializeUser(userResult.user);
                } else {
                    console.log("⛔️ No user in redirect result — fallback to onAuthStateChanged");
                }
            } catch (error) {
                console.error("❌ getRedirectResult error:", error);
            } finally {
                unsubscribe = onAuthStateChanged(auth, initializeUser);
            }
        };

        if (isMobile) {
            console.log("📱 Mobile device detected — using handleRedirectResult");
            handleRedirectResult();
        } else {
            console.log("💻 Desktop device — using onAuthStateChanged");
            unsubscribe = onAuthStateChanged(auth, initializeUser);
        }

        return () => {
            if (typeof unsubscribe === "function") {
                console.log("🧹 Cleaning up auth listener");
                unsubscribe();
            }
        };
    }, [isMobile, auth]);

    const initializeUser = async (user) => {
        console.log("👤 initializeUser called with:", user);
        try {
            if (user && (user as GoogleUser)?.uid) {
                let resultUser: User | undefined = undefined;
                const rawUser = initRawUser(user);
                console.log("📤 Sending rawUser to backend:", rawUser);
                const response = await fetchCreateNewUser({ rawUser }, lang);
                console.log("📥 fetchCreateNewUser response:", response);

                if (response.user) {
                    resultUser = response.user;
                }

                if (resultUser) {
                    if (resultUser.movement) {
                        const { grade, amount, gender, movement } = resultUser.movement;
                        console.log("🧠 Saving session data:", resultUser.movement);
                        addSessionData(lang, movement, grade, amount, gender);
                    }
                    setCurrentUser(resultUser);
                    console.log("✅ User set successfully");
                    await checkIfNeedToSendMsg(resultUser);
                    setIsLoggedIn(true);
                    if (cookieLimit !== NEED_TO_LOGIN) setLimitCookie(NEED_TO_LOGIN);
                    return;
                }

                console.warn("⚠️ resultUser is undefined after backend call");
                setCurrentUser(undefined);
                setIsLoggedIn(false);
            } else {
                console.warn("⚠️ User object invalid or missing UID");
            }
        } catch (error) {
            console.error("❌ initializeUser error:", error);
            handleError(msg[lang].google.message);
        } finally {
            setLoading(false);
            console.log("⏹️ Finished initializeUser");
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
        </AuthContext.Provider>
    );
};


/**
 * for make getRedirectResult on localhost
 * https://stackoverflow.com/questions/77270210/firebase-onauthstatechanged-user-returns-null-when-on-localhost
 * disable chrome://flags/#third-party-storage-partitioning (found it on default)
 */
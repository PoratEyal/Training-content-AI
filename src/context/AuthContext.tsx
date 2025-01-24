import { useEffect, createContext, useState, useContext, useRef } from "react";
import { auth } from "../config/firebase";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { AuthContextType } from "../models/types/context";
import { defualtAuthContext } from "../models/defualtState/context";
import { GoogleUser, User } from "../models/types/user";
import { fetchCreateNewUser, fetchGetMsg } from "../utils/fetch";
import { useErrorContext } from "./ErrorContext";
import { addSessionData } from "../utils/movment";
import { NEED_TO_LOGIN } from "../models/constants/cookie";
import { initRawUser } from "../utils/user";
import msg from "../models/resources/errorMsg.json";
import { useCookiesContext } from "./CookiesContext";

/**
 * for make getRedirectResult on localhost
 * https://stackoverflow.com/questions/77270210/firebase-onauthstatechanged-user-returns-null-when-on-localhost
 * disable chrome://flags/#third-party-storage-partitioning (found it on default)
 */

export const AuthContext = createContext<AuthContextType>(defualtAuthContext);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const isMobile =
        /iPhone|iPad|iPod|Android|BlackBerry|IEMobile|Opera Mini|Windows Phone|webOS|Kindle|Mobile|Tablet/i.test(
            navigator.userAgent,
        );
    const { handleError } = useErrorContext();
    const { cookieLimit, setLimitCookie, removeRememberMeCookie } = useCookiesContext();
    const [currentUser, setCurrentUser] = useState<User | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [whatsNewMsg, setWhatsNewMsg] = useState<string>("");

    useEffect(() => {
        let unsubscribe: any;
        const handleRedirectResult = async () => {
            const userResult = await getRedirectResult(auth);
            if (userResult) {
                initializeUser(userResult);
            } else unsubscribe = onAuthStateChanged(auth, initializeUser);
        };
        if (isMobile) handleRedirectResult();
        else unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [isMobile, auth, loading]);

    const initializeUser = async (user) => {
        try {
            if (user && (user as GoogleUser)?.uid) {
                let resultUser: User | undefined = undefined;
                const rawUser = initRawUser(user);
                const response = await fetchCreateNewUser({ rawUser });
                if (response.user) {
                    resultUser = response.user;
                }
                if (resultUser) {
                    if (resultUser.movement) {
                        const { grade, amount, gender, movement } = resultUser.movement;
                        addSessionData(movement, grade, amount, gender);
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
            handleError(msg.google.message);
        } finally {
            setLoading(false);
        }
    };

    const blockRef = useRef<boolean>(true);
    const checkIfNeedToSendMsg = async (user: User) => {
        if (user.isSendMsg && blockRef.current) {
            const result = await fetchGetMsg();
            if (result.result === "success") {
                setWhatsNewMsg(result.msg.text);
                blockRef.current = false;
            }
        }
    }

    const setIsSendMsg = () => {
        setCurrentUser({
            ...currentUser,
            isSendMsg: false
        });
    }

    const logout = async () => {
        try {
            await auth.signOut();
            removeRememberMeCookie();
            setCurrentUser(undefined);
            setIsLoggedIn(false);
        } catch (error) {
            handleError(error);
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
                whatsNewMsg
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

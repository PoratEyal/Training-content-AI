import { useEffect, createContext, useState, useContext, useRef } from "react";
import { auth } from "../config/firebase";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { AuthContextType } from "../models/types/context";
import { defualtAuthContext } from "../models/defualtState/context";
import { GoogleUser, User } from "../models/types/user";
import { fetchCreateNewUser } from "../utils/fetch";
import { useErrorContext } from "./ErrorContext";
import { useCookies } from "react-cookie";
import { addSessionData } from "../utils/movment";
import {
    COOKIE_LIMIT,
    COOKIE_USER_CONSENT,
    CookieOptions,
    GUEST_LIMIT_VALUE,
    USER_CONSENT_VALUE,
} from "../models/constants/cookie";
import { initRawUser } from "../utils/user";
import msg from "../models/resources/errorMsg.json";

export const AuthContext = createContext<AuthContextType>(defualtAuthContext);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const { handleError } = useErrorContext();
    const [currentUser, setCurrentUser] = useState<User | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // const [generateLimit, setGenerateLimit] = useState<number>(0);

    const [cookies, setCookie] = useCookies([COOKIE_LIMIT, COOKIE_USER_CONSENT]);

    /**
     * for make getRedirectResult on localhost
     * https://stackoverflow.com/questions/77270210/firebase-onauthstatechanged-user-returns-null-when-on-localhost
     * disable chrome://flags/#third-party-storage-partitioning (found it on default)
     */

    useEffect(() => {
        let unsubscribe: any;
        const handleRedirectResult = async () => {
            const userResult = await getRedirectResult(auth);
            if (userResult) {
                // Session.set("signInRef", true);
                initializeUser(userResult)
            }
            else unsubscribe = onAuthStateChanged(auth, initializeUser);
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
                    setIsLoggedIn(true);
                    if (cookies[COOKIE_LIMIT] !== GUEST_LIMIT_VALUE)
                        setLimitCookie(GUEST_LIMIT_VALUE);
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

    const logout = async () => {
        try {
            await auth.signOut();
            setCurrentUser(undefined);
            setIsLoggedIn(false);
        } catch (error) {
            handleError(error);
        }
    };

    const setLimitCookie = (data: string | number) => {
        setCookie(COOKIE_LIMIT, JSON.stringify(data), CookieOptions);
    };

    const setConsentCookie = () => {
        setCookie(COOKIE_USER_CONSENT, USER_CONSENT_VALUE, CookieOptions);
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isLoggedIn,
                loading,
                logout,
                cookies,
                setCookie,
                setConsentCookie,
                setLimitCookie,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

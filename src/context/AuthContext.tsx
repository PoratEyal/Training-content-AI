import { useEffect, createContext, useState, useContext } from "react";
import { auth } from "../config/firebase";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { AuthContextType } from "../models/types/context";
import { defualtAuthContext } from "../models/defualtState/context";
import { GoogleUser, User } from "../models/types/user";
import { fetchCreateNewUser } from "../utils/fetch";
import { useErrorContext } from "./ErrorContext";
import { NOT_REGISTER_LIMIT } from "../models/constants";
import { useCookies } from "react-cookie";
import { addSessionData } from "../utils/movment";
import {
    COOKIE_LIMIT,
    COOKIE_USER_CONSENT,
    CookieOptions,
    LIMIT_VALUE,
    OLD_LIMIT_VALUE,
    USER_CONSENT_VALUE,
} from "../models/constants/cookie";
import { initRawUser } from "../utils/user";

export const AuthContext = createContext<AuthContextType>(defualtAuthContext);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const { handleError } = useErrorContext();
    const [currentUser, setCurrentUser] = useState<User | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    // const [generateLimit, setGenerateLimit] = useState<number>(0);
    const [guestLimit, setGuestLimit] = useState<number | undefined>();
    const [reachLimit, setReachLimit] = useState(false);

    const [cookies, setCookie] = useCookies([COOKIE_LIMIT, COOKIE_USER_CONSENT]);

    const setStateFromSession = () => {
        try {
            if (guestLimit === undefined) {
                const cookieLimit = cookies[COOKIE_LIMIT];
                if (cookieLimit) {
                    setGuestLimit(parseInt(cookieLimit));
                }
            }
        } catch (error) {}
    };
    setStateFromSession();

    useEffect(() => {

        if(cookies[COOKIE_LIMIT] === OLD_LIMIT_VALUE){
            setLimitCookie(3);
        }

        let unsubscribe: any;
        const handleRedirectResult = async () => {
            const userResult = await getRedirectResult(auth);
            if (userResult) initializeUser(userResult);
            else unsubscribe = onAuthStateChanged(auth, initializeUser);
        };
        if (isMobile) handleRedirectResult();
        else unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [isMobile, auth]);

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
                        const { grade, amount, place, gender, movement } = resultUser.movement;
                        addSessionData(movement, grade, amount, place, gender);
                    }
                    setCurrentUser(resultUser);
                    setIsLoggedIn(true);
                    if (cookies[COOKIE_LIMIT] !== LIMIT_VALUE) setLimitCookie(LIMIT_VALUE);
                    return;
                }
                setCurrentUser(undefined);
                setIsLoggedIn(false);
            }
        } catch (error) {
            handleError(error);
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

    const updateGuestLimit = () => {
        let limit = cookies[COOKIE_LIMIT];
        if (isLoggedIn) return false;

        if (!limit) {
            setGuestLimit(1);
            setLimitCookie(1);
            setReachLimit(false);
            return false;
        }
        if (limit === LIMIT_VALUE) {
            setReachLimit(false);
            return false;
        } else {
            limit = parseInt(limit);
            //reach limit

            if (limit >= NOT_REGISTER_LIMIT) {
                setReachLimit(true);
                return true;
            }

            //not reach limit
            setGuestLimit((prev) => {
                const lim = prev ? prev + 1 : 1;
                if (lim <= NOT_REGISTER_LIMIT) setLimitCookie(lim);
                return lim;
            });
            setReachLimit(false);
            return false;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isLoggedIn,
                loading,
                logout,
                updateGuestLimit,
                guestLimit,
                cookies,
                setCookie,
                setLimitCookie,
                setConsentCookie,
                reachLimit,
                setReachLimit,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

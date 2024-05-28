import { useEffect, createContext, useState, useContext } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContextType } from "../models/types/context";
import { defualtAuthContext } from "../models/defualtState/context";
import { GoogleUser, User } from "../models/types/user";
import { fetchGetUserById } from "../utils/fetch";
import { useErrorContext } from "./ErrorContext";
import { NOT_REGISTER_LIMIT } from "../models/constants";
import { useCookies } from "react-cookie";
import { addSessionData } from "../utils/movment";
import {
    COOKIE_LIMIT,
    COOKIE_USER_CONSENT,
    CookieOptions,
    LIMIT_VALUE,
    USER_CONSENT_VALUE,
} from "../models/constants/cookie";

export const AuthContext = createContext<AuthContextType>(defualtAuthContext);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { handleError } = useErrorContext();
    const [currentUser, setCurrentUser] = useState<User | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    // const [generateLimit, setGenerateLimit] = useState<number>(0);
    const [unRegisterLimit, setUnRegisterLimit] = useState<number | undefined>();

    const [cookies, setCookie] = useCookies([COOKIE_LIMIT, COOKIE_USER_CONSENT]);

    const setStateFromSession = () => {
        try {
            if (unRegisterLimit === undefined) {
                const cookieLimit = cookies[COOKIE_LIMIT];
                if (cookieLimit) {
                    setUnRegisterLimit(parseInt(cookieLimit));
                }
            }
        } catch (error) {}
    };
    setStateFromSession();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    const initializeUser = async (user) => {
        try {
            if (user && !currentUser) {
                let resultUser;
                const response = await fetchGetUserById({ id: (user as GoogleUser).uid });
                if (response.user) {
                    resultUser = response.user;
                }
                setUser(resultUser);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const setUser = (user: User | undefined) => {
        if (user) {
            if (user.movement) {
                const { grade, amount, place, gender, movement } = user.movement;
                addSessionData(movement, grade, amount, place, gender);
            }
            setCurrentUser(user);
            setIsLoggedIn(true);
        } else {
            setCurrentUser(undefined);
            setIsLoggedIn(false);
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

    const updateUnRegisterLimit = () => {
        setUnRegisterLimit((prev) => {
            const lim = prev ? prev + 1 : 1;
            if (lim <= NOT_REGISTER_LIMIT) setLimitCookie(lim);
            return lim;
        });
        // return reachUnRegisterLimit();
    };

    const reachUnRegisterLimit = () => {
        if (isLoggedIn) return false;
        if (cookies[COOKIE_LIMIT] === LIMIT_VALUE) return false;
        if (unRegisterLimit >= NOT_REGISTER_LIMIT) return true;
        return false;
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isLoggedIn,
                loading,
                logout,
                updateUnRegisterLimit,
                reachUnRegisterLimit,
                unRegisterLimit,
                cookies,
                setCookie,
                setUser,
                setLimitCookie,
                setConsentCookie,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

import { useEffect, createContext, useState, useContext } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContextType } from "../models/types/context";
import { defualtAuthContext } from "../models/defualtState/context";
import { GoogleUser, User } from "../models/types/user";
import { fetchGetUserById } from "../utils/fetch";
import { useErrorContext } from "./ErrorContext";
import { PROMPT_LIMIT } from "../models/constants/state";
import { useCookies } from "react-cookie";
import { forLongTime } from "../utils/time";

export const AuthContext = createContext<AuthContextType>(defualtAuthContext);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { handleError } = useErrorContext();
    const [currentUser, setCurrentUser] = useState<User | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    // const [generateLimit, setGenerateLimit] = useState<number>(0);
    const [unRegisterLimit, setUnRegisterLimit] = useState<number | undefined>();

    const [cookies, setCookie] = useCookies(["limit", "user-consent"]);

    const setStateFromSession = () => {
        try {
            if (unRegisterLimit === undefined) {
                const cookieLimit = cookies["limit"];
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
            if (user) {
                //TODO: init user from data
                const response = await fetchGetUserById({ id: (user as GoogleUser).uid });
                if (response.user) {
                    setCurrentUser(response.user);
                    setIsLoggedIn(true);
                } else {
                    setCurrentUser(undefined);
                    setIsLoggedIn(false);
                }
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

    const updateUnRegisterLimit = () => {
        setUnRegisterLimit((prev) => {
            const lim = prev ? prev + 1 : 1;
            if (lim <= PROMPT_LIMIT) {
                setCookie("limit", JSON.stringify(lim), {
                    path: "/",
                    expires: forLongTime,
                });
            }
            return lim;
        });
    };

    const isNotReachUnRegisterLimit = () => {
        if (!unRegisterLimit || unRegisterLimit < PROMPT_LIMIT - 1) return true;
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
                isNotReachUnRegisterLimit,
                unRegisterLimit,
                cookies,
                setCookie,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

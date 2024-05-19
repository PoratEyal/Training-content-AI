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
import { delay, forLongTime } from "../utils/time";
import { addSessionData } from "../utils/movment";

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
            if (user && !currentUser) {
                let resultUser;
                for (let i = 0; i < 4; i++) {
                    const response = await fetchGetUserById({ id: (user as GoogleUser).uid });
                    await delay(100);
                    if (response.user) {
                        resultUser = response.user;
                        break;
                    }
                }
                if (resultUser) {
                    if (resultUser.movement) {
                        const { grade, amount, place, gender, movement } = resultUser.movement;
                        addSessionData(movement, grade, amount, place, gender);
                    }
                    setCurrentUser(resultUser);
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
            if (lim <= NOT_REGISTER_LIMIT) {
                setCookie("limit", JSON.stringify(lim), {
                    path: "/",
                    expires: forLongTime,
                });
            }
            return lim;
        });
    };

    const reachUnRegisterLimit = () => {
        if (isLoggedIn) return false;
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

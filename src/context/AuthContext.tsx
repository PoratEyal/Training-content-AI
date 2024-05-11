import { useEffect, createContext, useState, useContext } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContextType } from "../models/types/context";
import { defualtAuthContext } from "../models/defualtState/context";
import { GoogleUser, User } from "../models/types/user";
import { fetchGetUserById } from "../utils/fetch";
import { useErrorContext } from "./ErrorContext";

export const AuthContext = createContext<AuthContextType>(defualtAuthContext);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { handleError } = useErrorContext();
    const [currentUser, setCurrentUser] = useState<User | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    const initializeUser = async (user) => {
        try {
            if (user) {
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

    return (
        <AuthContext.Provider value={{ currentUser, isLoggedIn, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
import { createContext, useContext } from "react";
import { notification } from "../utils/error";

export type ErrorContextType = {
    handleError: (error: Error | string | undefined) => void;
    handleAlert: (message: string, duration?: number) => void;
    handleSuccess: (message: string) => void;
};

export const defualtErrorContext = {
    handleError: () => {},
    handleAlert: () => {},
    handleSuccess: () => {},
};

export const ErrorContext = createContext<ErrorContextType>(defualtErrorContext);

export const useErrorContext = () => useContext(ErrorContext);

export const ErrorContextProvider = ({ children }: { children: React.ReactNode }) => {
    const handleError = (error: Error | string | undefined) => {
        console.error(error);
        notification("", error.toString().replace(/^Error:\s*/, ""), "danger", {
            duration: 6000,
            onScreen: true,
        });
    };

    const handleAlert = (error: Error | string | undefined) => {
        console.error(error);
        notification("", error.toString().replace(/^Error:\s*/, ""), "info", {
            duration: 6000,
            onScreen: true,
        });
    };

    const handleSuccess = (message: string) => {
        notification("", message, "success", { duration: 2500, onScreen: false });
    };

    return (
        <ErrorContext.Provider value={{ handleError, handleAlert, handleSuccess }}>
            {children}
        </ErrorContext.Provider>
    );
};

import { createContext, useContext } from "react";
import { notification } from "../utils/error";
import { defualtErrorContext } from "../models/defualtState/context";
import { ErrorContextType } from "../models/types/context";

export const ErrorContext = createContext<ErrorContextType>(defualtErrorContext);

export const useErrorContext = () => useContext(ErrorContext);

export const ErrorContextProvider = ({ children }: { children: React.ReactNode }) => {
    const handleError = (error: Error | string | undefined) => {
        console.error(error);
        notification("שגיאה", "חיפושך לא הניב תוצאות. בשל העובדה שהחיפוש מבוסס בינה מלאכותית אפשר לנסות שוב עם אותם מילות חיפוש" || "", "danger");
    };

    const handleAlert = (message: string, duration?: number) => {
        notification("", message, "info", { duration: duration || 3000, onScreen: true });
    };

    const handleSuccess = (message: string) => {
        notification("", message, "success", { duration: 500, onScreen: false });
    };

    return (
        <ErrorContext.Provider value={{ handleError, handleAlert, handleSuccess }}>
            {children}
        </ErrorContext.Provider>
    );
};

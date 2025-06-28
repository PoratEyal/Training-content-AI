import { createContext, useContext } from "react";
import { notification } from "../utils/notification";
import { useLanguage } from "../i18n/useLanguage";

export type NotificationContextType = {
    notifyError: (error: Error | string | undefined) => void;
    notifyAlert: (message: string, duration?: number) => void;
    notifySuccess: (message: string) => void;
};

export const defaultNotificationContext = {
    notifyError: () => {},
    notifyAlert: () => {},
    notifySuccess: () => {},
};

export const NotificationContext = createContext<NotificationContextType>(defaultNotificationContext);

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { dir } = useLanguage();

    const notifyError = (error: Error | string | undefined) => {
        notification("", error.toString().replace(/^Error:\s*/, ""), "danger", {
            duration: 6000,
            onScreen: true,
            dir
        });
    };

    const notifyAlert = (error: Error | string | undefined) => {
        notification("", error.toString().replace(/^Error:\s*/, ""), "info", {
            duration: 6000,
            onScreen: true,
            dir
        });
    };

    const notifySuccess = (message: string) => {
        notification("", message, "success", { 
            duration: 2500, 
            onScreen: false,
            dir
        });
    };

    return (
        <NotificationContext.Provider value={{ notifyError: notifyError, notifyAlert: notifyAlert, notifySuccess: notifySuccess }}>
            {children}
        </NotificationContext.Provider>
    );
};

import { createContext, useContext } from "react";
import { notification, NotificationOptions } from "../utils/notification";
import { useLanguage } from "../i18n/useLanguage";

export type NotificationContextType = {
  notifyError: (error: Error | string | undefined, options?: NotificationOptions) => void;
  notifyAlert: (message: string, options?: NotificationOptions) => void;
  notifySuccess: (message: string, options?: NotificationOptions) => void;
};

export const defaultNotificationContext: NotificationContextType = {
  notifyError: () => {},
  notifyAlert: () => {},
  notifySuccess: () => {},
};

export const NotificationContext = createContext<NotificationContextType>(defaultNotificationContext);

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { dir } = useLanguage();

  const notifyError = (error: Error | string | undefined, options?: NotificationOptions) => {
    notification("", error?.toString().replace(/^Error:\s*/, ""), "danger", {
      duration: 6000,
      onScreen: true,
      dir,
      ...options,
    });
  };

  const notifyAlert = (message: string, options?: NotificationOptions) => {
    notification("", message, "info", {
      duration: 6000,
      onScreen: true,
      dir,
      ...options,
    });
  };

  const notifySuccess = (message: string, options?: NotificationOptions) => {
    notification("", message, "success", {
      duration: 2500,
      onScreen: false,
      dir,
      ...options,
    });
  };

  return (
    <NotificationContext.Provider value={{ notifyError, notifyAlert, notifySuccess }}>
      {children}
    </NotificationContext.Provider>
  );
};

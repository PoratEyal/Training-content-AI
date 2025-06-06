import { createContext, useContext, useEffect, useState } from "react";
import Session from "../utils/sessionStorage";
import { Activity } from "../models/types/activity";
import { addSessionData } from "../utils/movment";
import { useAuthContext } from "./AuthContext";
import { Movements } from "../models/resources/movment";
import { SessionKey } from "../models/enum/storage";
import { DataType } from "../models/types/common";
import { useLanguage } from "../i18n/useLanguage";

export type ContentContextType = {
  data: DataType | undefined;
  mainActivity: Activity | undefined;
  setData: React.Dispatch<React.SetStateAction<DataType | undefined>>;
  updateDetails: (movement: string, grade: string, amount: string, gender: string) => void;
  updateMainActivity: (activity: Activity) => void;
  clearAll: () => void;
  clearMainActivity: () => void;
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContentContext = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContentContext must be used within a ContentProvider");
  }
  return context;
};

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuthContext();
  const [data, setData] = useState<DataType | undefined>();
  const [mainActivity, setMainActivity] = useState<Activity | undefined>();
  const { lang } = useLanguage();

  useEffect(() => {
    try {
      if (!data) {
        const sessionData: DataType | undefined = Session.get(SessionKey.DATA);
        if (sessionData) {
          setData(sessionData);
        }
      }
      if (!mainActivity) {
        const sessionActivity: Activity | undefined = Session.get(SessionKey.ACTIVITY);
        if (sessionActivity) {
          setMainActivity(sessionActivity);
        }
      }
    } catch (error) {
      console.error("Failed to restore session data", error);
    }
  }, []);

  useEffect(() => {
    if (!data && currentUser?.movement) {
      const { grade, amount, gender, movement } = currentUser.movement;
      const newData = {
        movement: Movements[lang][movement],
        grade,
        amount,
        gender,
      };
      setData(newData);
    }
  }, [currentUser, data, lang]);

  const updateDetails = (movement: string, grade: string, amount: string, gender: string) => {
    const newData = addSessionData(lang, movement, grade, amount, gender);
    Session.set(SessionKey.DATA, newData);
    setData(newData);
  };

  const updateMainActivity = (activity: Activity) => {
    setMainActivity(activity);
    Session.set(SessionKey.ACTIVITY, activity);
  };

  const clearAll = async () => {
    Session.clear();
    setData(undefined);
    setMainActivity(undefined);
  };

  const clearMainActivity = () => {
    setMainActivity(undefined);
    Session.remove(SessionKey.ACTIVITY);
  };

  return (
    <ContentContext.Provider
      value={{
        data,
        setData,
        mainActivity,
        updateDetails,
        updateMainActivity,
        clearAll,
        clearMainActivity,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

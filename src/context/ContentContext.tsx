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
    data: DataType;
    mainActivity: Activity | undefined;
    setData: React.Dispatch<React.SetStateAction<DataType>>;
    updateDetails: (movement: string, grade: string, amount: string, gender: string) => void;
    updateMainActivity: (activity: Activity) => void;
    clearAll: () => void;
    clearMainActivity: () => void;
};

export const typeContext = {
    data: undefined,
    mainActivity: undefined,
    setData: () => {},
    updateDetails: () => {},
    updateMainActivity: () => {},
    clearAll: () => {},
    clearMainActivity: () => {},
};

export const ContentContext = createContext<ContentContextType>(typeContext);

export const useContentContext = () => useContext(ContentContext);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
    
    const { currentUser } = useAuthContext();
    const [data, setData] = useState<DataType | undefined>();
    const [mainActivity, setMainActivity] = useState<Activity | undefined>();
    const { lang } = useLanguage();

    const setStateFromSession = () => {
        try {
            if (data === undefined) {
                const sessionData: DataType | undefined = Session.get(SessionKey.DATA);
                if (sessionData) {
                    setData(sessionData);
                }
            }
            if (mainActivity === undefined) {
                const sessionActivity: Activity | undefined = Session.get(SessionKey.ACTIVITY);
                if (sessionActivity) {
                    setMainActivity(sessionActivity);
                }
            }
        } catch (error) {}
    };
    setStateFromSession();

    useEffect(() => {
        if (!data && currentUser && currentUser.movement) {
            const { grade, amount, gender, movement } = currentUser.movement;
            setData({
                movement: Movements[lang][movement],
                grade: grade,
                amount: amount,
                gender: gender,
            });
        }
    }, [currentUser, data, lang]);

    const updateDetails = (movement: string, grade: string, amount: string, gender: string) => {
        setData((prevData) => {
            const data = addSessionData(lang, movement, grade, amount, gender);
            Session.set(SessionKey.DATA, data);
            return data;
        });
    };

    const clearAll = () => {
        Session.clear();
        setData(undefined);
    };

    const clearMainActivity = () => {
        setMainActivity(undefined);
        Session.remove(SessionKey.ACTIVITY);
    };

    const updateMainActivity = (activity: Activity) => {
        setMainActivity(activity);
        Session.set(SessionKey.ACTIVITY, activity);
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

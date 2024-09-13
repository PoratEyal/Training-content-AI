import { createContext, useContext, useEffect, useState } from "react";
import { ContentContextType, DataType } from "../models/types/context";
import { typeContext } from "../models/defualtState/context";
import Session from "../utils/sessionStorage";
import { Activity } from "../models/types/activity";
import { addSessionData } from "../utils/movment";
import { useAuthContext } from "./AuthContext";
import { Movements } from "../models/resources/movment";
import { SessionKey } from "../models/enum/session";

export const ContentContext = createContext<ContentContextType>(typeContext);

export const useContentContext = () => useContext(ContentContext);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentUser } = useAuthContext();
    const [data, setData] = useState<DataType | undefined>();
    const [mainActivity, setMainActivity] = useState<Activity | undefined>();

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
                movement: Movements[movement],
                grade: grade,
                amount: amount,
                gender: gender,
            });
        }
    }, [currentUser]);

    const updateDetails = (movement, grade, amount, gender) => {
        setData((prevData) => {
            const data = addSessionData(movement, grade, amount, gender);
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

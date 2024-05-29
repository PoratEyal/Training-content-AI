import { createContext, useContext, useEffect, useState } from "react";
import { ContentContextType, DataType } from "../models/types/context";
import { typeContext } from "../models/defualtState/context";
import Session from "../utils/sessionStorage";
import { Activity } from "../models/types/activity";
import { addSessionData } from "../utils/movment";
import { useAuthContext } from "./AuthContext";
import { Movements } from "../models/resources/movment";

export const ContentContext = createContext<ContentContextType>(typeContext);

export const useContentContext = () => useContext(ContentContext);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentUser } = useAuthContext();
    const [data, setData] = useState<DataType | undefined>();
    const [mainActivity, setMainActivity] = useState<Activity | undefined>();

    const setStateFromSession = () => {
        try {
            if (data === undefined) {
                const sessionData: DataType | undefined = Session.get("data");
                if (sessionData) {
                    setData(sessionData);
                }
            }
            if (mainActivity === undefined) {
                const sessionActivity: Activity | undefined = Session.get("activity");
                if (sessionActivity) {
                    setMainActivity(sessionActivity);
                }
            }
        } catch (error) {}
    };
    setStateFromSession();

    useEffect(() => {
        if (!data && currentUser && currentUser.movement) {
            const { grade, amount, place, gender, movement } = currentUser.movement;
            setData({
                movement: Movements[movement],
                grade: grade,
                amount: amount,
                place: place,
                gender: gender,
            });
        }
    }, [currentUser]);

    const updateDetails = (movement, grade, amount, place, gender) => {
        setData((prevData) => {
            const data = addSessionData(movement, grade, amount, place, gender);
            Session.set("data", data);
            return data;
        });
    };

    const clearAll = () => {
        Session.clear();
        setData(undefined);
    };

    //TODO: change name
    const clearPath = () => {
        setMainActivity(undefined);
        Session.remove("activity");
    };

    const updateMainActivity = (activity: Activity) => {
        setMainActivity(activity);
        Session.set("activity", activity);
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
                clearPath,
            }}
        >
            {children}
        </ContentContext.Provider>
    );
};

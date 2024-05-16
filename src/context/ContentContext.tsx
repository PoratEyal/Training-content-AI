import { createContext, useContext, useState } from "react";
import { ContentContextType, DataType } from "../models/types/context";
import { typeContext } from "../models/defualtState/context";
import Session from "../utils/sessionStorage";
import { Activity } from "../models/types/activity";
import { Movements } from "../models/resources/movment";

export const ContentContext = createContext<ContentContextType>(typeContext);

export const useContentContext = () => useContext(ContentContext);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<DataType | undefined>();

    const setStateFromSession = () => {
        try {
            if (data === undefined) {
                const sessionData: DataType | undefined = Session.get("data");
                if (sessionData) {
                    setData(sessionData);
                }
            }
        } catch (error) {}
    };
    setStateFromSession();

    const updateDetails = (movement, grade, amount, place, gender) => {
        setData((prevData) => {
            const d = {
                ...prevData,
                movement: Movements[movement],
                grade: grade,
                amount: amount,
                place: place,
                gender: gender,
            };
            Session.set("data", d);
            return d;
        });
    };

    const clearAll = () => {
        Session.clear();
        setData(undefined);
    }

    const clearPath = () => {
        if(data?.movement?.path.length === 0) return;
        setData((prevData) => {
            const updatedPath = prevData.movement.path.map(pathItem => ({
                ...pathItem,
                activity: undefined
            }));
            const updatedData: DataType = { 
                ...prevData, 
                movement: { 
                    ...prevData.movement, 
                    path: updatedPath 
                } 
            };
            Session.set("data", updatedData);
            return updatedData;
        });
    }

    const updateMovementPath = (index: number, activity: Activity) => {
        setData((prevData) => {
            prevData.movement.path[index].activity = activity;
            Session.set("data", { ...prevData });
            return { ...prevData };
        });
    };

    return (
        <ContentContext.Provider
            value={{
                data,
                setData,
                updateDetails,
                updateMovementPath,
                clearAll,
                clearPath,
            }}
        >
            {children}
        </ContentContext.Provider>
    );
};

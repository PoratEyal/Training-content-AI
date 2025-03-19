import { createContext, useContext, useState } from "react";
import { ActivityContextType } from "../models/types/context";
import { defualtActivityContext } from "../models/defualtState/context";

export const ActivityContext = createContext<ActivityContextType>(defualtActivityContext);

export const useActivityContext = () => useContext(ActivityContext);

export const ActivityProvider = ({ children }: { children: React.ReactNode }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    return (
        <ActivityContext.Provider
            value={{
                isEdit,
                setIsEdit
            }}
        >
            {children}
        </ActivityContext.Provider>
    );
};

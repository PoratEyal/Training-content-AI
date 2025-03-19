import { createContext, useContext, useState } from "react";

export type ActivityContextType = {
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export const defualtActivityContext: ActivityContextType = {
    isEdit: false,
    setIsEdit: () => {},
};

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

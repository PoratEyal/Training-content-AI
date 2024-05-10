import { Activity } from "./activity";
import { Movement } from "./movement";

export type ActivityType = {
    subject: string;
    time: string;
    use: boolean;
    data: string;
};

export type DataType = {
    movement: Movement | undefined;
    grade: string;
    gender: string;
    amount: string;
    place: string;
};

export type ContentContextType = {
    data: DataType;
    setData: React.Dispatch<React.SetStateAction<DataType>>;
    limit: number;
    updateLimit: () => void;
    cookies: any;
    setCookie: (name: string, value: any, options?: any) => void;
    updateDetails: (movement: string, grade: string, amount: string, place: string, gender: string) => void;
    resetAllUseFields: () => void;
    updateContentActivity: (activity: Activity) => void;
    updatePointOfView: (activity: Activity) => void;
    updateScoutingTime: (activity: Activity) => void;
    updatePlayingTime: (activity: Activity) => void;
    contextUpdateSet: Object;
};

export type ErrorContextType = {
    handleError: (error: Error | string | undefined) => void;
    handleAlert: (message: string, duration?: number) => void;
    handleSuccess: (message: string) => void;
};

export type AuthContextType = {
    currentUser: any;
    userLoggedIn: boolean;
    loading: boolean;
};

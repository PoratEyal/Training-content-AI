import { Activity } from "./activity";
import { Movement } from "./movement";
import { User } from "./user";

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
    updateDetails: (
        movement: string,
        grade: string,
        amount: string,
        place: string,
        gender: string,
    ) => void;
    updateMovementPath: (index: number, activity: Activity) => void;
    clearAll: () => void;
    clearPath: () => void;
};

export type ErrorContextType = {
    handleError: (error: Error | string | undefined) => void;
    handleAlert: (message: string, duration?: number) => void;
    handleSuccess: (message: string) => void;
};

export type AuthContextType = {
    currentUser: User | undefined;
    isLoggedIn: boolean;
    loading: boolean;
    logout: () => Promise<void>;
    guestLimit: number;
    isReachGuestLimit: () => boolean;
    cookies: any;
    setCookie: (name: string, value: any, options?: any) => void;
    setLimitCookie: (data: string | number) => void;
    setConsentCookie: () => void;
    reachLimit: boolean;
    setReachLimit: React.Dispatch<React.SetStateAction<boolean>>;
};

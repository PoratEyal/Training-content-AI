import { Activity, StaticSubjects } from "./activity";
import { Movement } from "./movement";
import { User } from "./user";
import { Dispatch, SetStateAction } from "react";

export type DataType = {
    movement: Movement | undefined;
    grade: string;
    gender: string;
    amount: string;
};

export type ContentContextType = {
    data: DataType;
    mainActivity: Activity | undefined;
    setData: React.Dispatch<React.SetStateAction<DataType>>;
    updateDetails: (movement: string, grade: string, amount: string, gender: string) => void;
    updateMainActivity: (activity: Activity) => void;
    clearAll: () => void;
    clearMainActivity: () => void;
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
    setIsSendMsg: () => void
    logout: () => Promise<void>;
    whatsNewMsg: string;
};

export type StaticContentContextType = {
    useFetchSubjectsData: () => void;
    subjects: StaticSubjects[];
    isLoading: boolean;
};

export type CookiesContextType = {
    cookieLimit: string | undefined;
    cookieUserConsent: string | undefined;
    cookieRememberMe: string | undefined;
    removeRememberMeCookie: () => void;
    setRememberMeCookie: () => void;
    setConsentCookie: () => void;
    setLimitCookie: (data: string | number) => void;
};

export type SaveContextType = {
    savedActivity: Activity[];
    isLoading: boolean;
    useFetchSavedData: () => void;
    getSavedActivities: () => Promise<void>;
    deleteActivity: (activityIdToDelete: string) => Promise<void>;
};

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
    logout: () => Promise<void>;
    isPopupVisible: boolean;
    handlePopupClose: () => void;
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>;
};

export type StaticContentContextType = {
    subjects: StaticSubjects[];
    isLoading: boolean;
}

export type CookiesContextType = {
    cookieLimit: string | undefined;
    cookieUserConsent: string | undefined;
    cookiePopupReview: string | undefined;
    cookieVisitCount: string | undefined;
    cookieRememberMe: string | undefined;
    removeRememberMeCookie: () => void;
    setRememberMeCookie: () => void;
    setPopupReviewCookie: () => void;
    setConsentCookie: () => void;
    setLimitCookie: (data: string | number) => void;
    setVisitCount: (visitCount: number) => void;
}
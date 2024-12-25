import { AuthContextType, CookiesContextType, SaveContextType, StaticContentContextType } from "../types/context";

export const typeContext = {
    data: undefined,
    mainActivity: undefined,
    setData: () => {},
    updateDetails: () => {},
    updateMainActivity: () => {},
    clearAll: () => {},
    clearMainActivity: () => {},
};

export const defualtErrorContext = {
    handleError: () => {},
    handleAlert: () => {},
    handleSuccess: () => {},
};

export const defualtAuthContext: AuthContextType = {
    currentUser: null,
    isLoggedIn: false,
    loading: true,
    logout: async () => {},
    isPopupVisible: false,
    handlePopupClose: () => {},
    setIsPopupVisible: () => {},
};

export const defualtStaticContentContext: StaticContentContextType = {
    useFetchSubjectsData: () => {},
    subjects: [],
    isLoading: true,
};

export const defualtCookiesContext: CookiesContextType = {
    cookieLimit: undefined,
    cookieUserConsent: undefined,
    cookiePopupReview: undefined,
    cookieVisitCount: undefined,
    cookieRememberMe: undefined,
    removeRememberMeCookie: () => {},
    setRememberMeCookie: () => {},
    setPopupReviewCookie: () => {},
    setConsentCookie: () => {},
    setLimitCookie: () => {},
    setVisitCount: () => {},
}

export const defualtSaveContext: SaveContextType = {
    savedActivity: [],
    isLoading: false,
    useFetchSavedData: () => {},
    getSavedActivities: async () => {},
    deleteActivity: async () => {},
}
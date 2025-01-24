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
    whatsNewMsg: "",
};

export const defualtStaticContentContext: StaticContentContextType = {
    useFetchSubjectsData: () => {},
    subjects: [],
    isLoading: true,
};

export const defualtCookiesContext: CookiesContextType = {
    cookieLimit: undefined,
    cookieUserConsent: undefined,
    cookieRememberMe: undefined,
    removeRememberMeCookie: () => {},
    setRememberMeCookie: () => {},
    setConsentCookie: () => {},
    setLimitCookie: () => {},
}

export const defualtSaveContext: SaveContextType = {
    savedActivity: [],
    isLoading: false,
    useFetchSavedData: () => {},
    getSavedActivities: async () => {},
    deleteActivity: async () => {},
}
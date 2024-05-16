import { PROMPT_LIMIT } from "../constants/state";

export const typeContext = {
    data: undefined,
    setData: () => {},
    updateDetails: () => {},
    resetAllUseFields: () => {},
    updateMovementPath: () => {},
    clearAll: () => {},
    clearPath: () => {},
};

export const defualtErrorContext = {
    handleError: () => {},
    handleAlert: () => {},
    handleSuccess: () => {},
};

export const defualtAuthContext = {
    currentUser: null,
    isLoggedIn: false,
    loading: true,
    logout: async () => {},
    unRegisterLimit: PROMPT_LIMIT,
    updateUnRegisterLimit: () => {},
    cookies: {},
    setCookie: () => {},
    isNotReachUnRegisterLimit: () => true,
};

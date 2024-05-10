import { PROMPT_LIMIT } from "../constants/state";

export const typeContext = {
    data: undefined,
    setData: () => {},
    limit: PROMPT_LIMIT,
    updateLimit: () => {},
    cookies: {},
    setCookie: () => {},
    updateDetails: () => {},
    resetAllUseFields: () => {},
    updateContentActivity: () => {},
    updatePointOfView: () => {},
    updateScoutingTime: () => {},
    updatePlayingTime: () => {},
    contextUpdateSet: {},
};

export const defualtErrorContext = {
    handleError: () => {},
    handleAlert: () => {},
    handleSuccess: () => {},
};

export const defualtAuthContext = {
    currentUser: null,
    userLoggedIn: false,
    loading: true,
};

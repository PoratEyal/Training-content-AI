export const typeContext = {
    data: undefined,
    setData: () => {},
    mainActivity: undefined,
    updateDetails: () => {},
    updateMainActivity: () => {},
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
    cookies: {},
    setCookie: () => {},
    setLimitCookie: () => {},
    setConsentCookie: () => {},
};

export const typeContext = {
    data: undefined,
    setData: () => {},
    updateDetails: () => {},
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
    signInRef: null,
    currentUser: null,
    isLoggedIn: false,
    loading: true,
    logout: async () => {},
    cookies: {},
    setCookie: () => {},
    setLimitCookie: () => {},
    setConsentCookie: () => {},
};

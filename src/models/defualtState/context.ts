
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

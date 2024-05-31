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
    currentUser: null,
    isLoggedIn: false,
    loading: true,
    logout: async () => {},
    guestLimit: 0,
    isReachGuestLimit: () => true,
    cookies: {},
    setCookie: () => {},
    setLimitCookie: () => {},
    setConsentCookie: () => {},
    reachLimit: false,
    setReachLimit: () => {},
};

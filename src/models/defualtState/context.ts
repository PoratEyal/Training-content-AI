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
    unRegisterLimit: 0,
    updateUnRegisterLimit: () => {},
    cookies: {},
    setCookie: () => {},
    reachUnRegisterLimit: () => true,
    setUser: () => {},
};

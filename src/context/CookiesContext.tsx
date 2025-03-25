import { createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import {
    COOKIE_LIMIT_KEY,
    COOKIE_USER_CONSENT,
    CookieOptions,
    USER_CONSENT_VALUE,
    REMEMEBER_ME_KEY,
} from "../models/constants/cookie";

export type CookiesContextType = {
    cookieLimit: string | undefined;
    cookieUserConsent: string | undefined;
    cookieRememberMe: string | undefined;
    removeRememberMeCookie: () => void;
    setRememberMeCookie: () => void;
    setConsentCookie: () => void;
    setLimitCookie: (data: string | number) => void;
};

export const defualtCookiesContext: CookiesContextType = {
    cookieLimit: undefined,
    cookieUserConsent: undefined,
    cookieRememberMe: undefined,
    removeRememberMeCookie: () => {},
    setRememberMeCookie: () => {},
    setConsentCookie: () => {},
    setLimitCookie: () => {},
};

export const CookiesContext = createContext<CookiesContextType>(defualtCookiesContext);

export const useCookiesContext = () => useContext(CookiesContext);

export const CookiesProvider = ({ children }: { children: React.ReactNode }) => {
    const [cookies, setCookie, removeCookie] = useCookies([
        COOKIE_LIMIT_KEY,
        COOKIE_USER_CONSENT,
        REMEMEBER_ME_KEY,
    ]);

    const cookieLimit = cookies[COOKIE_LIMIT_KEY];
    const cookieUserConsent = cookies[COOKIE_USER_CONSENT];
    const cookieRememberMe = cookies[REMEMEBER_ME_KEY];

    const setLimitCookie = (data: string | number) => {
        setCookie(COOKIE_LIMIT_KEY, JSON.stringify(data), CookieOptions);
    };

    const setConsentCookie = () => {
        setCookie(COOKIE_USER_CONSENT, USER_CONSENT_VALUE, CookieOptions);
    };

    const setRememberMeCookie = () => {
        setCookie(REMEMEBER_ME_KEY, "true", CookieOptions);
    };

    const removeRememberMeCookie = () => {
        removeCookie(REMEMEBER_ME_KEY);
    };

    return (
        <CookiesContext.Provider
            value={{
                cookieLimit,
                cookieUserConsent,
                cookieRememberMe,
                removeRememberMeCookie,
                setRememberMeCookie,
                setConsentCookie,
                setLimitCookie,
            }}
        >
            {children}
        </CookiesContext.Provider>
    );
};

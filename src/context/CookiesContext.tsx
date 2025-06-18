import { createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import { COOKIE_LIMIT_KEY, COOKIE_USER_CONSENT, CookieOptions, USER_CONSENT_VALUE } from "../models/constants/cookie";

export type CookiesContextType = {
    cookieLimit: string | undefined;
    cookieUserConsent: string | undefined;
    setConsentCookie: () => void;
    setLimitCookie: (data: string | number) => void;
};

export const defualtCookiesContext: CookiesContextType = {
    cookieLimit: undefined,
    cookieUserConsent: undefined,
    setConsentCookie: () => {},
    setLimitCookie: () => {},
};

export const CookiesContext = createContext<CookiesContextType>(defualtCookiesContext);

export const useCookiesContext = () => useContext(CookiesContext);

export const CookiesProvider = ({ children }: { children: React.ReactNode }) => {
    const [cookies, setCookie, removeCookie] = useCookies([
        COOKIE_LIMIT_KEY,
        COOKIE_USER_CONSENT,
    ]);

    const cookieLimit = cookies[COOKIE_LIMIT_KEY];
    const cookieUserConsent = cookies[COOKIE_USER_CONSENT];

    const setLimitCookie = (data: string | number) => {
        setCookie(COOKIE_LIMIT_KEY, JSON.stringify(data), CookieOptions);
    };

    const setConsentCookie = () => {
        setCookie(COOKIE_USER_CONSENT, USER_CONSENT_VALUE, CookieOptions);
    };

    return (
        <CookiesContext.Provider
            value={{
                cookieLimit,
                cookieUserConsent,
                setConsentCookie,
                setLimitCookie,
            }}
        >
            {children}
        </CookiesContext.Provider>
    );
};

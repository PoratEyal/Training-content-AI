import { createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import {
    COOKIE_LIMIT_KEY,
    COOKIE_USER_CONSENT,
    CookieOptions,
    USER_CONSENT_VALUE,
    POPUP_REVIEW,
    VISIT_COUNT_KEY,
    REMEMEBER_ME_KEY,
} from "../models/constants/cookie";
import { CookiesContextType } from "../models/types/context";
import { defualtCookiesContext } from "../models/defualtState/context";

export const CookiesContext = createContext<CookiesContextType>(defualtCookiesContext);

export const useCookiesContext = () => useContext(CookiesContext);

export const CookiesProvider = ({ children }: { children: React.ReactNode }) => {
    const [cookies, setCookie, removeCookie] = useCookies([
        COOKIE_LIMIT_KEY,
        COOKIE_USER_CONSENT,
        POPUP_REVIEW,
        VISIT_COUNT_KEY,
        REMEMEBER_ME_KEY
    ]);

    const cookieLimit = cookies[COOKIE_LIMIT_KEY];
    const cookieUserConsent = cookies[COOKIE_USER_CONSENT];
    const cookiePopupReview = cookies[POPUP_REVIEW];
    const cookieVisitCount = cookies[VISIT_COUNT_KEY];
    const cookieRememberMe = cookies[REMEMEBER_ME_KEY];

    const setPopupReviewCookie = () => {
        setCookie(POPUP_REVIEW, true, CookieOptions);
    };

    const setLimitCookie = (data: string | number) => {
        setCookie(COOKIE_LIMIT_KEY, JSON.stringify(data), CookieOptions);
    };

    const setConsentCookie = () => {
        setCookie(COOKIE_USER_CONSENT, USER_CONSENT_VALUE, CookieOptions);
    };

    const setVisitCount = (visitCount: number) => {
        setCookie(VISIT_COUNT_KEY, visitCount.toString(), CookieOptions);
    }

    const setRememberMeCookie = () => {
        setCookie(REMEMEBER_ME_KEY, "true", CookieOptions);
    }

    const removeRememberMeCookie = () => {
        removeCookie(REMEMEBER_ME_KEY)
    }

    return (
        <CookiesContext.Provider
            value={{
                cookieLimit,
                cookieUserConsent,
                cookiePopupReview,
                cookieVisitCount,
                cookieRememberMe,
                removeRememberMeCookie,
                setRememberMeCookie,
                setPopupReviewCookie,
                setConsentCookie,
                setLimitCookie,
                setVisitCount
            }}
        >
            {children}
        </CookiesContext.Provider>
    );
};

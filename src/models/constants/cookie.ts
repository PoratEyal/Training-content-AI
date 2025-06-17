import { forLongTime } from "../../utils/time";

export const COOKIE_LIMIT_KEY = "limit";
export const COOKIE_USER_CONSENT = "user-consent";

export const CookieOptions = {
    path: "/",
    expires: forLongTime,
};

export const USER_CONSENT_VALUE = "accepted";
export const NEED_TO_LOGIN = "guest-block";

export const REMEMEBER_ME_KEY = 'rememberMe';   // Can be removed


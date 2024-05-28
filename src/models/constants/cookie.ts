import { forLongTime } from "../../utils/time";

export const COOKIE_LIMIT = "limit";
export const COOKIE_USER_CONSENT = "user-consent";

export const CookieOptions = {
    path: "/",
    expires: forLongTime,
};

export const USER_CONSENT_VALUE = "accepted";
export const LIMIT_VALUE = "loggedIn";

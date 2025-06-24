import { forLongTime } from "../../utils/time";

export const COOKIE_LIMIT_KEY = "limit";
export const COOKIE_USER_CONSENT = "user-consent";

export const CookieOptions = {
    path: "/",
    expires: forLongTime,
};

export const USER_CONSENT_VALUE = "accepted";
export const GUEST_BLOCK_MustLogin = "guest-block";

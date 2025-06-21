/**
 * Custom hook to handle Google sign-in flow.
 * Chooses between popup (desktop) and redirect (mobile),
 * manages loading state, and handles auth errors gracefully.
 */
import { auth } from "../config/firebase";
import { signInNow } from "../utils/signInNow";
import { useCookiesContext } from "../context/CookiesContext";
import { useErrorContext } from "../context/ErrorContext";
import { useProduct } from "../context/ProductContext";
import { useLanguage } from "../i18n/useLanguage";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../context/ProductType";
import { logEvent } from "../utils/logEvent";
import errMsg from "../models/resources/errorMsg.json";
import route from "../router/route.json";
import { NEED_TO_LOGIN } from "../models/constants/cookie";


const useSignIn = () => {

    const { handleError } = useErrorContext();
    const { setLimitCookie } = useCookiesContext();
    const { lang } = useLanguage();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const product = useProduct();
    const langKey = lang.charAt(0).toUpperCase() + lang.slice(1);
    const isPractice = product === ProductType.Practice;
    const homePagePath = isPractice
        ? route[`practiceHomePage${langKey}`] || route.practiceHomePageEn
        : route[`youthHomePage${langKey}`] || route.youthHomePageEn;

    const signInWithGoogle = async () => {
        setLimitCookie(NEED_TO_LOGIN);

        try {
            await signInNow(auth);
        } catch (error: any) {
            const errorStr = error?.toString?.() || "";
            logEvent(`Google Sign-In Error: ${errorStr}`, "guest");

            if (errorStr.includes("auth/popup-closed-by-user") || errorStr.includes("auth/cancelled-popup-request")) {
                alert(t("login.mustLogin"));
            } else {
                handleError(errMsg[lang].google.message);
            }

        } finally {
            navigate(homePagePath);
        }
    };


    return { signInWithGoogle };
};

export default useSignIn;

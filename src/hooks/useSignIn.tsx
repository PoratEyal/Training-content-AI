//
// Handles Google Sign-In, sets login cookie, logs errors, and redirects home
//
import { auth } from "../config/firebase";
import { signInNow } from "../utils/signInNow";
import { useCookiesContext } from "../context/CookiesContext";
import { useProduct } from "../context/ProductContext";
import { useLanguage } from "../i18n/useLanguage";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../context/ProductType";
import { logEvent } from "../utils/logEvent";
import route from "../router/route.json";
import { NEED_TO_LOGIN } from "../models/constants/cookie";


const useSignIn = () => {

    const { cookieLimit, setLimitCookie } = useCookiesContext();
    const { lang } = useLanguage();
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
            if (cookieLimit) {  // cleanup: set limit cookie to a "must login" value
                const lastWeek = new Date()
                lastWeek.setDate(lastWeek.getDate() - 7)
                setLimitCookie(lastWeek.toString())
            }
            const errorStr = error?.toString?.() || "";
            logEvent(`Google Sign-In Error, usually indicates exit login: ${errorStr}`, "guest");

        } finally {
            navigate(homePagePath);
        }
    };


    return { signInWithGoogle };
};

export default useSignIn;

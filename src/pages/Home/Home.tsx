import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import route from "../../router/route.json";
import useSignIn from "../../hooks/useSignIn";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import { NEED_TO_LOGIN } from "../../models/constants/cookie";
import ContinueWithAI from "../../components/titles/ContinueWithAI/ContinueWithAI";
import { isMoreThanADayAfter, isValidDateFormat } from "../../utils/time";
import Session from "../../utils/sessionStorage";
import { SessionKey } from "../../models/enum/storage";
import StartBtn from "../../components/StartBtn/StartBtn";
import LinkBtn from "../../components/LinkBtn/LinkBtn";
import { useEffect, useState } from "react";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import helmet from "../../models/resources/helmet.json";
import ReviewPopup from "../../components/ReviewPopup/ReviewPopup";
import { useCookiesContext } from "../../context/CookiesContext";
import { SignInStatus } from "../../models/enum/registrationStatus";

function Home() {
    const {
        cookieVisitCount,
        setVisitCount,
        cookiePopupReview,
        cookieLimit,
        setLimitCookie,
        cookieRememberMe,
    } = useCookiesContext();

    const navigate = useNavigate();

    const { currentUser, isLoggedIn, isPopupVisible, handlePopupClose, setIsPopupVisible } =
    useAuthContext();

    const [rememberMe, setRememberMe] = useState<SignInStatus>(SignInStatus.NEW_ACCESS);

    const handleStart = () => {
        const navigateTo: string | undefined = Session.get(SessionKey.NAVIGATE);
        Session.remove(SessionKey.NAVIGATE);
        if (navigateTo) navigate(navigateTo);
    };

    const { signInWithGoogle, isLoading, btnDisabled } = useSignIn(handleStart);

    useEffect(() => {
        if (rememberMe === SignInStatus.NEW_ACCESS) {
            setRememberMe(cookieRememberMe ? SignInStatus.REMEMBER : SignInStatus.NOT_REMEMBER);
        }
    }, [isLoggedIn, currentUser]);

    // Run once to increment visit count and possibly show popup
    useEffect(() => {
        let visitCount = parseInt(cookieVisitCount || "0", 10);
        if (isNaN(visitCount)) {
            visitCount = 0;
        }

        visitCount += 1;
        setVisitCount(visitCount);

        if (!cookiePopupReview && visitCount >= 3) {
            const timer = setTimeout(() => {
                setIsPopupVisible(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, []);

    const navigateAndSetCookieDate = (navigateTo: string) => {
        setLimitCookie(new Date().toString());
        navigate(navigateTo);
    };

    const guestSignInOrNavigate = (limitDate: string, navigateTo: string) => {
        const isValidDate = isValidDateFormat(limitDate);
        if (isValidDate) {
            const isMoreThanDay = isMoreThanADayAfter(limitDate);

            if (isMoreThanDay) {
                signInWithGoogle();
            } else {
                navigateAndSetCookieDate(navigateTo);
            }
        }
    };

    const startAsGuestOrUser = (navigateTo: string) => {
        if (currentUser && isLoggedIn) {
            navigate(navigateTo);
            return;
        }

        Session.set(SessionKey.NAVIGATE, navigateTo);
        if (cookieLimit) {
            if (cookieLimit === NEED_TO_LOGIN) {
                signInWithGoogle();
            } else {
                guestSignInOrNavigate(cookieLimit, navigateTo);
            }
        } else {
            navigateAndSetCookieDate(navigateTo);
        }
    };

    return (
        <PageLayout
            path={route.home}
            hasFooter
            title={helmet.home.title}
            content={helmet.home.content}
            hasHeader={{}} /** -> show only the profile image **/
        >
            <div className={styles.logo_text_div}>
                <ContinueWithAI />
                <h1 className={styles.home_lable}>מותאם, פשוט ומהיר 🤟</h1>
            </div>

            {rememberMe == SignInStatus.REMEMBER && !isLoading && currentUser?.image ? (
                <section className={styles.button_section}>
                    <StartBtn
                        text="צרו פעולות חדשות"
                        onClick={() => startAsGuestOrUser(route.details)}
                        isDisabled={btnDisabled}
                    />
                    <LinkBtn
                        text="צפו בפעולות מוכנות"
                        onClick={() => startAsGuestOrUser(route.content)}
                        isDisabled={btnDisabled}
                    />
                </section>
            ) : rememberMe == SignInStatus.NOT_REMEMBER && !isLoading && !isLoading ? (
                <section className={styles.button_section}>
                    <StartBtn
                        text="צרו פעולות חדשות"
                        onClick={() => startAsGuestOrUser(route.details)}
                        isDisabled={btnDisabled}
                    />
                    <LinkBtn
                        text="צפו בפעולות מוכנות"
                        onClick={() => startAsGuestOrUser(route.content)}
                        isDisabled={btnDisabled}
                    />
                </section>
            ) : (
                <div className={styles.button_section_loading}>
                    <SmallLoading />
                </div>
            )}

            {isPopupVisible && <ReviewPopup onClose={handlePopupClose} />}
        </PageLayout>
    );
}

export default Home;

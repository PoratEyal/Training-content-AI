import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import route from "../../router/route.json";
import useSignIn from "../../hooks/useSignIn";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import { COOKIE_LIMIT, GUEST_LIMIT_VALUE } from "../../models/constants/cookie";
import ContinueWithAI from "../../components/titles/ContinueWithAI/ContinueWithAI";
import { isMoreThanADayAfter, isValidDateFormat } from "../../utils/time";
import Session from "../../utils/sessionStorage";
import { SessionKey } from "../../models/enum/session";
import StartBtn from "../../components/StartBtn/StartBtn";
import LinkBtn from "../../components/LinkBtn/LinkBtn";
import { useEffect, useState } from "react";

function Home() {
    const { currentUser, isLoggedIn, cookies, setLimitCookie } = useAuthContext();
    const [btnLoading, setBtnLoading] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const navigateTo: string | undefined = Session.get(SessionKey.NAVIGATE);
        if (navigateTo) {
            if (navigateTo === route.details) setBtnLoading(1);
            else if (navigateTo === route.examplesActivities) setBtnLoading(2);
        }
    }, []);

    const handleStart = () => {
        const navigateTo: string | undefined = Session.get(SessionKey.NAVIGATE);
        Session.remove(SessionKey.NAVIGATE);
        navigateTo && navigate(navigateTo);
    };

    const { signInWithGoogle, isLoading, btnDisabled } = useSignIn(handleStart);

    const navigateAndSetCookieDate = (navigateTo: string) => {
        setLimitCookie(new Date().toString());
        navigate(navigateTo);
    };

    const startAsGuestOrUser = (navigateTo: string) => {
        if (currentUser && isLoggedIn) {
            navigate(navigateTo);
            return;
        }

        Session.set(SessionKey.NAVIGATE, navigateTo);
        let limitDate = cookies[COOKIE_LIMIT];

        if (limitDate) {
            if (limitDate === GUEST_LIMIT_VALUE) {
                signInWithGoogle();
            } else {
                const isValidDate = isValidDateFormat(limitDate);
                if (isValidDate) {
                    const isMoreThanDay = isMoreThanADayAfter(limitDate);

                    if (isMoreThanDay) signInWithGoogle();
                    else navigateAndSetCookieDate(navigateTo);
                }
            }
        } else navigateAndSetCookieDate(navigateTo);
    };

    return (
        <PageLayout path={route.home} hasFooter>
            <div className={styles.logo_text_div}>
                <ContinueWithAI />

                <h1 className={styles.home_lable}>יצירת פעילויות: מותאם, פשוט ומהיר 🤟</h1>
            </div>

            <section className={styles.button_section}>
                <StartBtn
                    text="צרו פעילות חדשה"
                    onClick={() => startAsGuestOrUser(route.details)}
                    isLoading={isLoading && btnLoading === 1}
                    isDisabled={btnDisabled}
                />
                <LinkBtn
                    text="צפו בפעילויות מוכנות"
                    onClick={() => startAsGuestOrUser(route.examplesActivities)}
                    isLoading={isLoading && btnLoading === 2}
                    isDisabled={btnDisabled}
                />
            </section>
        </PageLayout>
    );
}

export default Home;

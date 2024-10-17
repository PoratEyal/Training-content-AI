import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import route from "../../router/route.json";
import useSignIn from "../../hooks/useSignIn";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import { COOKIE_LIMIT_KEY, GUEST_LIMIT_VALUE } from "../../models/constants/cookie";
import ContinueWithAI from "../../components/titles/ContinueWithAI/ContinueWithAI";
import { isMoreThanADayAfter, isValidDateFormat } from "../../utils/time";
import Session from "../../utils/sessionStorage";
import { SessionKey } from "../../models/enum/session";
import StartBtn from "../../components/StartBtn/StartBtn";
import LinkBtn from "../../components/LinkBtn/LinkBtn";
import { useEffect, useState } from "react";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import helmet from "../../models/resources/helmet.json";

function Home() {
    const { currentUser, isLoggedIn, cookies, setLimitCookie } = useAuthContext();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(true);
    const [btnLoading, setBtnLoading] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            setIsUserLoggedIn(false);
            return;
        }
        const timer = setTimeout(() => {
            setIsUserLoggedIn(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [isLoggedIn]);

    useEffect(() => {
        const navigateTo: string | undefined = Session.get(SessionKey.NAVIGATE);
        if (navigateTo) {
            if (navigateTo === route.details) setBtnLoading(1);
            else if (navigateTo === route.content) setBtnLoading(2);
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
        let limitDate = cookies[COOKIE_LIMIT_KEY];

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
        <PageLayout
            path={route.home}
            hasFooter
            title={helmet.home.title}
            content={helmet.home.content}
        >
            <div className={styles.logo_text_div}>
                <ContinueWithAI />

                <h1 className={styles.home_lable}>יצירת פעולות: מותאם, פשוט ומהיר 🤟</h1>
            </div>

            {isUserLoggedIn ? (
                <div className={styles.button_section_loading}>
                    <SmallLoading />
                </div>
            ) : (
                <section className={styles.button_section}>
                    <StartBtn
                        text="צרו פעולות חדשות"
                        onClick={() => startAsGuestOrUser(route.details)}
                        isLoading={isLoading && btnLoading === 1}
                        isDisabled={btnDisabled}
                    />
                    <LinkBtn
                        text="צפו בפעולות מוכנות"
                        onClick={() => startAsGuestOrUser(route.content)}
                        isLoading={isLoading && btnLoading === 2}
                        isDisabled={btnDisabled}
                    />
                </section>
            )}
            {currentUser ? null : (
                <div style={{ width: 5, height: 5, backgroundColor: "red", borderRadius: "50%" }}>
                    .
                </div>
            )}
        </PageLayout>
    );
}

export default Home;

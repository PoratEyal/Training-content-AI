import MainBtn from "../../components/MainBtn/MainBtn";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import route from "../../router/route.json";
import useSignIn from "../../hooks/useSignIn";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import { COOKIE_LIMIT, GUEST_LIMIT_VALUE } from "../../models/constants/cookie";
import { useEffect, useState } from "react";
import ContinueWithAI from "../../components/titles/ContinueWithAI/ContinueWithAI";
import { isMoreThanADayAfter, isValidDateFormat } from "../../utils/time";
import Session from "../../utils/sessionStorage";
import { SessionKey } from "../../models/enums/session";

function Home() {
    const { isLoggedIn, loading, cookies, setLimitCookie } = useAuthContext();
    const navigate = useNavigate();
    const handleStart = () => navigate(route.details);
    const [isGuest, setIsGuest] = useState(true);

    useEffect(() => {
        let limit = cookies[COOKIE_LIMIT];
        const signInRef = Session.get(SessionKey.SIGNIN);
        if (signInRef && (signInRef as boolean) === true) {
            setIsGuest(false);
            return;
        }

        if (limit) {
            if (limit === GUEST_LIMIT_VALUE) {
                setIsGuest(false);
                return;
            } else {
                const isValid = isValidDateFormat(limit);
                if (isValid) {
                    const result = isMoreThanADayAfter(limit);
                    if (result) {
                        setLimitCookie(GUEST_LIMIT_VALUE);
                        setIsGuest(false);
                    }
                    return;
                }
            }
        }
        setLimitCookie(new Date().toString());
        setIsGuest(true);
    }, []);

    const { signInBtnText, signInDisabled, btnLoading, signInWithGoogle } = useSignIn(
        handleStart,
        "התחברות...",
        "מתחילים",
        "מתחברים ומתחילים",
    );

    const btnFunc = isLoggedIn ? () => handleStart() : () => signInWithGoogle();

    return (
        <PageLayout path={route.home} hasFooter>
            <div className={styles.logo_text_div}>
                <ContinueWithAI />

                <h1 className={styles.home_lable}>יצירת פעילויות: מותאם, פשוט ומהיר 🤟</h1>
            </div>

            <section className={styles.button_section}>
                <MainBtn
                    isLoading={btnLoading}
                    isDisabled={signInDisabled}
                    func={btnFunc}
                    height={42}
                    text={signInBtnText}
                ></MainBtn>

                {!isLoggedIn && !loading && isGuest ? (
                    <button onClick={handleStart} className={styles.home_login_btn}>
                        התחלה ללא חשבון
                    </button>
                ) : null}
            </section>
        </PageLayout>
    );
}

export default Home;

import MainBtn from "../../components/MainBtn/MainBtn";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import route from "../../router/route.json";
import useSignIn from "../../hooks/useSignIn";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import { COOKIE_LIMIT, LIMIT_VALUE } from "../../models/constants/cookie";
import { useEffect, useState } from "react";
import ContinueWithAI from "../../components/titles/ContinueWithAI/ContinueWithAI";

function Home() {
    const { isLoggedIn, loading, reachLimit, cookies } = useAuthContext();
    const navigate = useNavigate();
    const handleStart = () => navigate(route.details);
    const [isLoggedInCookie, setIsLoggedInCookie] = useState(false);

    const { signInBtnText, signInDisabled, btnLoading, signInWithGoogle } = useSignIn(
        handleStart,
        "התחברות...",
        "מתחילים",
        "מתחברים ומתחילים",
    );

    const btnFunc = isLoggedIn ? () => handleStart() : () => signInWithGoogle();

    useEffect(() => {
        setIsLoggedInCookie(cookies[COOKIE_LIMIT] === LIMIT_VALUE);
    }, [reachLimit]);

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

                {!isLoggedIn && !loading && !reachLimit && !isLoggedInCookie ? (
                    <button onClick={handleStart} className={styles.home_login_btn}>
                        התחלה ללא חשבון
                    </button>
                ) : null}
            </section>
        </PageLayout>
    );
}

export default Home;

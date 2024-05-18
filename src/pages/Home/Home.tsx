import Logo from "../../components/core/Logo/Logo";
import MainBtn from "../../components/MainBtn/MainBtn";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { auth } from "../../config/firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";
import { fetchCreateNewUser } from "../../utils/fetch";
import Footer from "../../components/Layout/Footer/Footer";
import { useEffect, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import { initRawUser } from "../../utils/user";
import { useErrorContext } from "../../context/ErrorContext";
import errMsg from "../../models/resources/errorMsg.json";

function Home() {
    const { isLoggedIn, loading, reachUnRegisterLimit } = useAuthContext();
    const { data } = useContentContext();
    const { handleError } = useErrorContext();
    const navigate = useNavigate();

    const [signInBtnText, setSignInBtnText] = useState<string>(
        isLoggedIn ? "מתחילים" : "מתחברים ומתחילים",
    );

    const [signInDisabled, setSignInDisabled] = useState<boolean>(loading ? true : false);

    const handleStart = () => navigate("/details");

    useEffect(() => {
        if (!loading && isLoggedIn && data) handleStart();
        setSignInBtnText(isLoggedIn ? "מתחילים" : "מתחברים ומתחילים");
        setSignInDisabled(loading ? true : false);
    }, [loading, isLoggedIn]);

    const btnFunc = isLoggedIn ? () => handleStart() : () => signInWithGoogle();

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            setSignInBtnText("התחברות...");
            setSignInDisabled(true);
            await setPersistence(auth, browserLocalPersistence);
            const userResult = await signInWithPopup(auth, provider);
            if (userResult) {
                const rawUser = initRawUser(userResult.user);
                await fetchCreateNewUser({ rawUser });
                handleStart();
            }
        } catch (error) {
            handleError(errMsg.google.message);
        }
    };

    return (
        <section className={styles.container}>
            {/* <Logo /> */}
            <div className={styles.logo_text_div}>
                <img
                    className={styles.logo}
                    alt="big logo image for the homePage"
                    src="bigLogo.svg"
                ></img>

                <label className={styles.home_lable}>
                    <label>יצירת פעילויות: מותאם, פשוט ומהיר</label>
                    <img
                        className={styles.hand_icon}
                        alt="Hand cool icon"
                        src="hand_icon.svg"
                    ></img>
                </label>
            </div>

            <section className={styles.button_section}>
                <MainBtn
                    isDisabled={false}
                    func={handleStart}
                    height={42}
                    text="מתחילים"
                ></MainBtn>

                {/* {!isLoggedIn && !loading && !reachUnRegisterLimit() ? (
                    <button onClick={handleStart} className={styles.home_login_btn}>
                        התחלה ללא חשבון
                    </button>
                ) : null} */}
            </section>

            <Footer />
        </section>
    );
}

export default Home;

import React, { useState } from "react";
import Logo from "../../components/core/Logo/Logo";
import Btn from "../../components/btn/btn";
import styles from "./Home.module.css";
import SignUp from "../../components/popups/SignUp/SignUp";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { auth } from "../../config/firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";
import { GoogleUser } from "../../models/types/user";
import { initUser } from "../../utils/user";
import { fetchCreateNewUser } from "../../utils/fetch";
import Footer from "../../components/Layout/Footer/Footer";

function Home() {
    const { isLoggedIn, loading } = useAuthContext();
    const navigate = useNavigate();

    const handleStart = () => navigate("/details");

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await setPersistence(auth, browserLocalPersistence);
            const userResult = await signInWithPopup(auth, provider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(userResult);
            // const token = credential.accessToken;
            if (userResult) {
                const user = userResult.user as unknown as GoogleUser;
                const newUser = initUser(user);
                await fetchCreateNewUser({ newUser });
            }
        } catch (error) {
            //TODO: Handle Errors
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
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
                    <label>תכנון פעילויות פשוט ומהיר בלי מאמץ</label>
                    <img
                        className={styles.hand_icon}
                        alt="Hand cool icon"
                        src="hand_icon.svg"
                    ></img>
                </label>
            </div>

            <section className={styles.button_section}>
                <Btn
                    isDisabled={false}
                    func={handleStart}
                    height={38}
                    text="מתחברים ומתחילים"
                ></Btn>
                {loading ? (
                    <div>התחברות...</div>
                ) : !isLoggedIn ? (
                    <button onClick={signInWithGoogle} className={styles.home_login_btn}>
                        התחלה ללא חשבון
                    </button>
                ) : null}
            </section>

            <div className={styles.privacy_div}>
                <Footer></Footer>
            </div>
        </section>
    );
}

export default Home;

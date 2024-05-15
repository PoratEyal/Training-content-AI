import React, { useState } from "react";
import Logo from "../../components/core/Logo/Logo";
import Btn from "../../components/btn/btn";
import styles from "./Home.module.css";
import SignUp from "../../components/popups/SignUp/SignUp";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Footer from "../../components/Layout/Footer/Footer";

function Home() {
    const { isLoggedIn } = useAuthContext();
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleStart = () => navigate("/details");

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
                <Btn isDisabled={false} func={handleStart} height={38} text="מתחברים ומתחילים"></Btn>
                {!isLoggedIn ? (
                    <button onClick={handleOpenModal} className={styles.home_login_btn}>
                        התחלה ללא חשבון
                    </button>
                ) : null}
            </section>
            {openModal ? <SignUp closeFunc={handleCloseModal} /> : null}
            
            <div className={styles.privacy_div}>
                <Footer></Footer>
            </div>

        </section>
    );
}

export default Home;

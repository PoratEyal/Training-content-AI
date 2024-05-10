import React, { useState } from "react";
import Logo from "../../components/core/Logo/Logo";
import styles from "./Home.module.css";
import SignUp from "../../components/popups/SignUp/SignUp";

function Home() {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);

    return (
        <section>
            <Logo />
            <h1 className={styles.home_title} id="title">
                מתקדמים לפעילות ב-AI
            </h1>
            <label htmlFor="title" className={styles.home_lable}>
                אם בא לנו טקסט כאן
            </label>

            <section>
                <button className={styles.home_start_btn}>מתחילים</button>
                <button onClick={handleOpenModal} className={styles.home_login_btn}>הרשמה</button>
            </section>
            {openModal ? <SignUp /> : null}
        </section>
    );
}

export default Home;

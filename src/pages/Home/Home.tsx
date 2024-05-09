import React from "react";
import Logo from "../../components/core/Logo/Logo";
import styles from "./Home.module.css";

function Home() {
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
                <button className={styles.home_login_btn}>הרשמה</button>
            </section>
        </section>
    );
}

export default Home;

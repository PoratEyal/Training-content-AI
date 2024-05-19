import Logo from "../../components/core/Logo/Logo";
import MainBtn from "../../components/MainBtn/MainBtn";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Footer from "../../components/Layout/Footer/Footer";
import useSignIn from "../../hooks/useSignIn";
import { BIG_LOGO_IMG, HAND_ICON_IMG } from "../../models/constants/img";

function Home() {
    const { isLoggedIn, loading, reachUnRegisterLimit } = useAuthContext();
    const navigate = useNavigate();
    const handleStart = () => navigate("/details");
    const { signInBtnText, signInDisabled, signInWithGoogle,err } = useSignIn(
        handleStart,
        "התחברות...",
        "מתחילים",
        "מתחברים ומתחילים",
    );

    const btnFunc = isLoggedIn ? () => handleStart() : () => signInWithGoogle();

    return (
        <section className={styles.container}>
            {/* <div style={{position: "fixed", top: 0}}>
                {err.toString()}
            </div> */}
            {/* <Logo /> */}
            <div className={styles.logo_text_div}>
                <img
                    className={styles.logo}
                    alt="Advancing to activity with AI"
                    src={"bigLogo.svg"}
                ></img>

                <label className={styles.home_lable}>
                    <label>יצירת פעילויות: מותאם, פשוט ומהיר</label>
                    <img
                        className={styles.hand_icon}
                        alt="I-L-Y Emoji hand"
                        src={"hand_icon.svg"}
                    ></img>
                </label>
            </div>

            <section className={styles.button_section}>
                <MainBtn
                    isDisabled={false}
                    func={handleStart}
                    height={42}
                    text={"מתחילים"}
                ></MainBtn>

                {/* {!isLoggedIn && !loading && !reachUnRegisterLimit() ? (
                    <button onClick={handleStart} className={styles.home_login_btn}>
                        התחלה ללא חשבון
                    </button>
                ) : null} */}
            </section>

            <Footer func={signInWithGoogle} />
        </section>
    );
}

export default Home;

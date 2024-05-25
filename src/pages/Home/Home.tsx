import Logo from "../../components/core/Logo/Logo";
import MainBtn from "../../components/MainBtn/MainBtn";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Footer from "../../components/Layout/Footer/Footer";
import useSignIn from "../../hooks/useSignIn";
import { BIG_LOGO_IMG, HAND_ICON_IMG } from "../../models/constants/img";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";

function Home() {
    const { isLoggedIn, loading, reachUnRegisterLimit } = useAuthContext();
    const navigate = useNavigate();
    const handleStart = () => navigate("/details");
    const { signInBtnText, signInDisabled, signInWithGoogle } = useSignIn(
        handleStart,
        "התחברות...",
        "מתחילים",
        "מתחברים ומתחילים",
    );

    const btnFunc = isLoggedIn ? () => handleStart() : () => signInWithGoogle();

    return (
        <section className={styles.container}>
        </section>
    );
}

export default Home;

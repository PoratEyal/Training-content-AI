import { useAuthContext } from "../../../context/AuthContext";
import Profile from "../../Profile/Profile";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./Header.module.css";

type HeaderProps = {
    goBack?: () => void;
    isBlur?: boolean;
};

function Header({ goBack, isBlur = false }: HeaderProps) {
    const { isLoggedIn, loading, currentUser } = useAuthContext();
    const style = isBlur ? styles.header_fade : styles.header;
    const styleIcon = isBlur ? styles.back_icon_fade : styles.back_icon;

    return (
        <section className={style}>
            {!loading ? (
                <div className={styles.header_container}>
                    {isLoggedIn ? <Profile img={currentUser?.image || ""} /> : <div />}
                    {goBack ? (
                        <IoMdArrowRoundBack
                            onClick={goBack}
                            className={styleIcon}
                        ></IoMdArrowRoundBack>
                    ) : (
                        <div />
                    )}
                </div>
            ) : null}
        </section>
    );
}

export default Header;

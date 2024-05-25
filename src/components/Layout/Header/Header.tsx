import { useAuthContext } from "../../../context/AuthContext";
import Profile from "../../auth/Profile/Profile";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./Header.module.css";

type HeaderProps = {
    goBack?: () => void;
    isFade?: boolean;
};

function Header({ goBack, isFade = false }: HeaderProps) {
    const { isLoggedIn, loading, currentUser } = useAuthContext();
    const style = isFade ? styles.header_fade : styles.header;
    const styleIcon = isFade ? styles.back_icon_fade : styles.back_icon;

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

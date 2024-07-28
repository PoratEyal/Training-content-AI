import { useAuthContext } from "../../../context/AuthContext";
import Profile from "../../Profile/Profile";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./Header.module.css";
import { FaUserCircle } from "react-icons/fa";

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
            {!loading && (
                <div className={styles.header_container}>
                    <Profile img={isLoggedIn ? currentUser?.image : <FaUserCircle className={styles.user_icon}/>} />
                    {goBack && (
                        <IoMdArrowRoundBack
                            onClick={goBack}
                            className={styleIcon}
                        />
                    )}
                </div>
            )}
        </section>
    );
}

export default Header;

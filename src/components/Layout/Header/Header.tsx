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
            <div className={styles.header_container}>
                <Profile img={isLoggedIn ? currentUser?.image : undefined} isLoading={loading} />
                {!loading && goBack ? (
                    <IoMdArrowRoundBack onClick={goBack} className={styleIcon} />
                ) : null}
            </div>
        </section>
    );
}

export default Header;

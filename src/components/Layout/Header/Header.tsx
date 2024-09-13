import { useAuthContext } from "../../../context/AuthContext";
import Profile from "../../Profile/Profile";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

type HeaderProps = {
    hasLink?: { path: string; text: string } | undefined;
    goBack?: () => void;
    isBlur?: boolean;
};

function Header({ goBack, hasLink = undefined, isBlur = false }: HeaderProps) {
    const { isLoggedIn, loading, currentUser } = useAuthContext();
    const style = isBlur ? styles.header_fade : styles.header;
    const styleIcon = isBlur ? styles.back_icon_fade : styles.back_icon;

    return (
        <section className={style}>
            {!loading && (
                <div className={styles.header_container}>
                    <Profile img={isLoggedIn ? currentUser?.image : undefined} />
                    {goBack ? <IoMdArrowRoundBack onClick={goBack} className={styleIcon} /> : null}
                    {hasLink ? (
                        <Link to={hasLink.path} className={styles.link}>
                            {hasLink.text}
                        </Link>
                    ) : null}
                </div>
            )}
        </section>
    );
}

export default Header;

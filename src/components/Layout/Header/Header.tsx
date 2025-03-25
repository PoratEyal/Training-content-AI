import { useAuthContext } from "../../../context/AuthContext";
import { Icons } from "../../Icons";
import Profile from "../../Profile/Profile";
import ReadyContentName from "../../titles/ReadyContentName/ReadyContentName";
import styles from "./Header.module.css";

type HeaderProps = {
    goBack?: () => void;
    hasTitle?: string;
    isBlur?: boolean;
};

function Header({ goBack, hasTitle = undefined, isBlur = false }: HeaderProps) {
    const { isLoggedIn, loading, currentUser } = useAuthContext();
    const style = isBlur ? styles.header_fade : styles.header;
    const styleIcon = isBlur ? styles.back_icon_fade : styles.back_icon;

    return (
        <section className={style}>
            <div className={styles.header_container}>
                <Profile img={isLoggedIn ? currentUser?.image : undefined} isLoading={loading} />
                {hasTitle ? (
                    <ReadyContentName type="none" subject={hasTitle} />
                ) : null}
                {!loading && goBack ? (
                    <Icons.arrowBack onClick={goBack} className={styleIcon} />
                ) : null}
            </div>
        </section>
    );
}

export default Header;

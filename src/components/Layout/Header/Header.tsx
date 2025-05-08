import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Icons } from "../../Icons";
import Profile from "../../Profile/Profile";
import ReadyContentName from "../../titles/ReadyContentName/ReadyContentName";
import styles from "./Header.module.css";
import { useLanguage } from "../../../i18n/useLanguage";

type HeaderProps = {
    goBack?: () => void;
    hasTitle?: string;
    isBlur?: boolean;
};

const Header: React.FC<HeaderProps> = ({ goBack, hasTitle = undefined, isBlur = false }) => {
    const { isHebrew } = useLanguage();
    const { isLoggedIn, loading, currentUser } = useAuthContext();
    const style = isBlur ? styles.header_fade : styles.header;
    const styleIcon = isBlur ? styles.back_icon_fade : styles.back_icon;

    return (
        <section className={style}>
            <div
                className={
                    isHebrew ? styles.header_container : `${styles.header_container} ${styles.rtl}`
                }
            >
                <Profile img={isLoggedIn ? currentUser?.image : undefined} isLoading={loading} />
                {hasTitle ? <ReadyContentName type="none" subject={hasTitle} /> : null}
                {!loading && goBack ? (
                    isHebrew ? (
                        <Icons.arrowBack onClick={goBack} className={styleIcon} />
                    ) : (
                        <Icons.arrowForward onClick={goBack} className={styleIcon} />
                    )
                ) : null}
            </div>
        </section>
    );
};

export default Header;

//
// This is a general header component with optional back button, title, and language selector
// It shows the user's profile, adapts layout for RTL languages
//
import React, { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Icons } from "../../Icons";
import Profile from "../../Profile/Profile";
import styles from "./Header.module.css";
import { useLanguage } from "../../../i18n/useLanguage";
import LangPopup from "../../PopupLang/LangPopup";
import ReadyContentName from "../../titles/ReadyContentName/ReadyContentName";

type HeaderProps = {
    goBack?: () => void;
    hasTitle?: string;
    isBlur?: boolean;
};

const Header: React.FC<HeaderProps> = ({ goBack, hasTitle = undefined, isBlur = false }) => {
    const { isRTL } = useLanguage();
    const { isLoggedIn, loading, currentUser } = useAuthContext();
    const style = isBlur ? styles.header_fade : styles.header;
    const styleIcon = isBlur ? styles.back_icon_fade : styles.back_icon;

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const close = () => setIsPopupOpen(false);
    const openLangPopup = () => setIsPopupOpen(true);

    return (
        <section className={style}>
            <div
                className={
                    isRTL ? styles.header_container : `${styles.header_container} ${styles.rtl}`
                }
            >
                <Profile
                    img={isLoggedIn ? currentUser?.image : undefined}
                    isLoading={loading}
                    openLangPopup={openLangPopup}
                />
                {hasTitle ? <ReadyContentName type="none" subject={hasTitle} /> : null}
                {!loading && goBack ? (
                    isRTL ? (
                        <Icons.arrowBack onClick={goBack} className={styleIcon} />
                    ) : (
                        <Icons.arrowForward onClick={goBack} className={styleIcon} />
                    )
                ) : null}
            </div>
            {isPopupOpen ? <LangPopup handleClose={close} /> : null}
        </section>
    );
};

export default Header;

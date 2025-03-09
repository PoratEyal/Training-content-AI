import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Icons } from "../../Icons";
import Profile from "../../Profile/Profile";
import styles from "./Header.module.css";
import { useTranslation } from "react-i18next";

type HeaderProps = {
  goBack?: () => void;
  isBlur?: boolean;
};

function Header({ goBack, isBlur = false }: HeaderProps) {
  const { isLoggedIn, loading, currentUser } = useAuthContext();
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  const style = isBlur ? styles.header_fade : styles.header;
  const baseIconStyle = isBlur ? styles.back_icon_fade : styles.back_icon;

  // If we’re in English, add .arrow_english to flip the rotation
  const arrowClass = isEnglish
    ? `${baseIconStyle} ${styles.arrow_english}`
    : baseIconStyle;

  return (
    <section className={style}>
      <div className={
            isEnglish
            ? `${styles.header_container} ${styles.rtl}`
            : styles.header_container
        }>
        <Profile img={isLoggedIn ? currentUser?.image : undefined} isLoading={loading} />
        {!loading && goBack ? (
          <Icons.arrowBack onClick={goBack} className={arrowClass} />
        ) : null}
      </div>
    </section>
  );
}

export default Header;

//
// This is a language selection popup that lets users switch between supported languages.
// On language change, it clears the session data, updates the user's language in the database (if logged in),
// clears app data, and navigates to the home page for the new language.
//
import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./LangPopup.module.css";
import { useLanguage } from "../../i18n/useLanguage";
import { useAuthContext } from "../../context/AuthContext";
import { fetchUpdateUser } from "../../utils/fetch";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";
import { AiOutlineLoading } from "react-icons/ai";

type LangPopupProps = {
  handleClose: () => void;
};

const LangPopup: React.FC<LangPopupProps> = ({ handleClose }) => {

  const { changeLang, lang } = useLanguage();
  const { currentUser, setCurrentUser } = useAuthContext();
  const { clearAll } = useContentContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingLang, setLoadingLang] = useState<string | null>(null);

  // Dynamically determine the home page path for the NEW!!! language
  const homePagePath = (newLang: string) => {
    const capitalizedLang = newLang.charAt(0).toUpperCase() + newLang.slice(1);
    const isPractice = window.location.pathname.includes("/practice");
    if (isPractice) {
      return route[`practiceHomePage${capitalizedLang}`] || route.practiceHomePageEn;
    } else {
      return route[`youthHomePage${capitalizedLang}`] || route.youthHomePageEn;
    }
  };

  const closePopup = (callback?: () => void) => {
    if (callback) callback();
    handleClose();
  };

  const changeLanguage = async (newLang: string) => {

    setLoadingLang(newLang);
    setIsLoading(true);

    localStorage.setItem("i18nextLng", newLang);
    clearAll(); // Clean all data from Session Storage

    // If user is logged in, reset their movement details in DB
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        movement: {
          movement: null,
          grade: null,
          gender: null,
          amount: null,
        },
      };

      await fetchUpdateUser({ user: updatedUser });
      setCurrentUser(updatedUser);
    }

    changeLang(newLang);
    closePopup(() => {
      navigate(homePagePath(newLang));
    });

    setIsLoading(false);
    setLoadingLang(null);
  };

  return ReactDOM.createPortal(
    <div
      className={styles.popupOverlay}
      onClick={() => closePopup()}
      role="dialog"
      aria-modal="true"
      aria-label="Language Selection Popup"
    >
      <div
        className={styles.popupContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.buttonContainer}>
          <button
            onClick={() => changeLanguage("he")}
            className={`${styles.languageButton} ${lang === "he" ? styles.selected : ""}`}
            disabled={lang === "he"}
          >
            עברית
            {loadingLang === "he" ? (
              <span className={styles.checkmark}><AiOutlineLoading className={styles.loadingIcon} /></span>
            ) : (
              lang === "he" && !loadingLang && <span className={styles.checkmark}>✔</span>
            )}
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className={`${styles.languageButton} ${lang === "en" ? styles.selected : ""}`}
            disabled={lang === "en"}
          >
            English
            {loadingLang === "en" ? (
              <span className={styles.checkmark}><AiOutlineLoading className={styles.loadingIcon} /></span>
            ) : (
              lang === "en" && !loadingLang && <span className={styles.checkmark}>✔</span>
            )}
          </button>
          <button
            onClick={() => changeLanguage("es")}
            className={`${styles.languageButton} ${lang === "es" ? styles.selected : ""}`}
            disabled={lang === "es"}
          >
            Español
            {loadingLang === "es" ? (
              <span className={styles.checkmark}><AiOutlineLoading className={styles.loadingIcon} /></span>
            ) : (
              lang === "es" && !loadingLang && <span className={styles.checkmark}>✔</span>
            )}
          </button>
          <button
            onClick={() => changeLanguage("ar")}
            className={`${styles.languageButton} ${lang === "ar" ? styles.selected : ""}`}
            disabled={lang === "ar"}
            lang="ar"
          >
            العربية
            {loadingLang === "ar" ? (
              <span className={styles.checkmark}><AiOutlineLoading className={styles.loadingIcon} /></span>
            ) : (
              lang === "ar" && !loadingLang && <span className={styles.checkmark}>✔</span>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LangPopup;

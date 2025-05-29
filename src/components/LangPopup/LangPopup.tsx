import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as Flags from "country-flag-icons/react/3x2";
import styles from "./LangPopup.module.css";
import { useLanguage } from "../../i18n/useLanguage";
import { useAuthContext } from "../../context/AuthContext";
import { fetchUpdateUser } from "../../utils/fetch";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";
import PageLoading from "../../components/Loading/PageLoading/PageLoading";

type LangPopupProps = {
  handleClose: () => void;
};

const LangPopup: React.FC<LangPopupProps> = ({ handleClose }) => {
  const { changeLang, lang } = useLanguage();
  const { currentUser } = useAuthContext();
  const { clearAll } = useContentContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const closePopup = (callback?: () => void) => {
    if (callback) callback();
    handleClose();
  };

  const changeLanguage = async (newLang: string) => {
    setIsLoading(true);

    // Save language choice in localStorage
    localStorage.setItem("i18nextLng", newLang);

    // Clear session data
    sessionStorage.removeItem("data");

    // Reset user movement data if user exists
    if (currentUser) {
      await fetchUpdateUser({
        user: {
          ...currentUser,
          movement: {
            movement: null,
            grade: null,
            gender: null,
            amount: null,
          },
        },
      });
    }

    // Clear all stored content, change language, and navigate home
    clearAll();
    changeLang(newLang);
    closePopup(() => {
      navigate(route.home);
    });

    setIsLoading(false);
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
        {isLoading && (
          <div className={styles.loaderContainer}>
            <PageLoading />
          </div>
        )}
        {!isLoading && (
          <div className={styles.buttonContainer}>
            <button
              onClick={() => changeLanguage("he")}
              className={styles.languageButton}
              disabled={lang === "he"}
            >
              עברית
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={styles.languageButton}
              disabled={lang === "en"}
            >
              English
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default LangPopup;

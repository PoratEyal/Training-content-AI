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

  // Dynamically determine the home page path for the new language (fallback to Hebrew)
  const getHomePagePath = (newLang: string) =>
    route[`home${newLang.charAt(0).toUpperCase() + newLang.slice(1)}`] || "/he";

  const closePopup = (callback?: () => void) => {
    if (callback) callback();
    handleClose();
  };

  const changeLanguage = async (newLang: string) => {
    setIsLoading(true);

    localStorage.setItem("i18nextLng", newLang);
    sessionStorage.removeItem("data");

    // If user is logged in, reset their movement details in DB
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

    clearAll();
    changeLang(newLang);
    closePopup(() => {
      navigate(getHomePagePath(newLang));
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
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <PageLoading />
          </div>
        ) : (
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

            { <button
              onClick={() => changeLanguage("es")}
              className={styles.languageButton}
              disabled={lang === "es"}
            >
              Español
            </button> }

            { <button
              onClick={() => changeLanguage("ar")}
              className={styles.languageButton}
              disabled={lang === "ar"}
            >
              العربية
            </button> }
            
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default LangPopup;

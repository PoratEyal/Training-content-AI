import React, { useState, useEffect } from "react";
import { MdLanguage } from "react-icons/md";
import { useTranslation } from "react-i18next";
import * as Flags from "country-flag-icons/react/3x2";
import styles from "./LanguageSwitcherPopup.module.css";

const LanguageSwitcherPopup: React.FC = () => {
  const { i18n } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isPopupOpen) {
      setShowPopup(true);
    }
  }, [isPopupOpen]);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.container}>
      <MdLanguage size={24} onClick={togglePopup} className={styles.icon} />

      {isPopupOpen && (
        <div
          className={styles.popupOverlay}
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className={`${styles.popupContent} ${
              showPopup ? styles.popupContentShow : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Removed the cancel button here */}
            <div className={styles.buttonContainer}>
              <button
                onClick={() => changeLanguage("he")}
                className={styles.languageButton}
              >
                <Flags.IL title="Hebrew" className={styles.languageIcon} />
                עברית
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={styles.languageButton}
              >
                <Flags.US title="English" className={styles.languageIcon} />
                English
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcherPopup;

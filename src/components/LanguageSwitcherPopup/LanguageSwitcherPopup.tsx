import React, { useState, useEffect } from "react";
import { MdLanguage } from "react-icons/md";
import * as Flags from "country-flag-icons/react/3x2";
import styles from "./LanguageSwitcherPopup.module.css";
import { useLanguage } from "../../i18n/useLanguage";

const LanguageSwitcherPopup: React.FC = () => {
  const { changeLang } = useLanguage();
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
    changeLang(lang);
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

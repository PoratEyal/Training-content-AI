import React from "react";
import * as Flags from "country-flag-icons/react/3x2";
import styles from "./LangPopup.module.css";
import { useLanguage } from "../../i18n/useLanguage";

type LangPopupProps = {
    handleClose: () => void;
};

const LangPopup: React.FC<LangPopupProps> = ({ handleClose }) => {
    const { changeLang } = useLanguage();

    const changeLanguage = (lang: string) => {
        changeLang(lang);
        handleClose();
    };

    return (
        <div className={styles.popupOverlay} onClick={handleClose}>
            <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.buttonContainer}>
                    <button onClick={() => changeLanguage("he")} className={styles.languageButton}>
                        עברית
                    </button>
                    <button onClick={() => changeLanguage("en")} className={styles.languageButton}>
                        English
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LangPopup;

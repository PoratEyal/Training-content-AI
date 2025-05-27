import React, { useState } from "react";
import * as Flags from "country-flag-icons/react/3x2";
import styles from "./LangPopup.module.css";
import { useLanguage } from "../../i18n/useLanguage";
import { useAuthContext } from "../../context/AuthContext";
import { fetchUpdateUser } from "../../utils/fetch";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";

type LangPopupProps = {
    handleClose: () => void;
};

const LangPopup: React.FC<LangPopupProps> = ({ handleClose }) => {
    const { changeLang, lang } = useLanguage();
    const { currentUser } = useAuthContext();
    const { clearAll } = useContentContext();
    const navigate = useNavigate();

    const [closing, setClosing] = useState(false);

    const closeWithAnimation = (callback?: () => void) => {
    setClosing(true);
    setTimeout(() => {
        if (callback) callback();
        handleClose();
    }, 300);
    };


    const changeLanguage = async (newLang: string) => {
        sessionStorage.removeItem("data");

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
        closeWithAnimation(() => {
            navigate(route.home);
        });

    };

    return (
            <div
            className={`${styles.popupOverlay} ${closing ? styles.closing : ""}`}
            onClick={() => closeWithAnimation()}
            >

            <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
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
            </div>
        </div>
    );
};

export default LangPopup;

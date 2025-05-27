import React from "react";
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
    const { changeLang } = useLanguage();
    const { currentUser } = useAuthContext();
    const { clearAll } = useContentContext();
    const navigate = useNavigate();

    const changeLanguage = async (lang: string) => {
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
        changeLang(lang);
        handleClose();
        navigate(route.home);
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

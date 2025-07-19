import React from "react";
import styles from "./ArtOptGame.module.css";
import { FaQuestionCircle } from "react-icons/fa";
import { Activity } from "../../../../models/types/activity";
import { useLanguage } from "../../../../i18n/useLanguage";
import { StorageKey } from "../../../../models/enum/storage";
import { logEvent } from "../../../../utils/logEvent";

type ArtOptGameProps = {
    activity: Activity;
};

const ArtOptGame: React.FC<ArtOptGameProps> = ({ activity }) => {
    const { t, dir, lang } = useLanguage();

    const handleClick = () => {
        logEvent("מדריך לחץ כפתור טריוויה", "");

        localStorage.setItem(StorageKey.PRACTICE_TOPIC, activity.subject);
        localStorage.setItem(StorageKey.USER_TYPE, "instructor"); // Assume instructor role

        window.open(`https://activitywiz.com/${lang}/practice`, "_blank");
    };

    return (
        <div className={`${styles.gameBtn} ${styles[dir]}`} onClick={handleClick}>
            <FaQuestionCircle className={styles.icon} />
            <span className={styles.text}>{t("articleOptions.game")}</span>
        </div>
    );
};

export default ArtOptGame;

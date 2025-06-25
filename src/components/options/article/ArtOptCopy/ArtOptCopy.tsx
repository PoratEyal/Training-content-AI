import React from "react";
import styles from "./ArtOptCopy.module.css";
import { FaRegCopy } from "react-icons/fa";
import { Activity } from "../../../../models/types/activity";
import { formatCopy } from "../../../../utils/format";
import { useNotificationContext } from "../../../../context/NotificationContext";
import { useLanguage } from "../../../../i18n/useLanguage";

type ArtOptCopyProps = {
    activity: Activity;
};

const ArtOptCopy: React.FC<ArtOptCopyProps> = ({ activity }) => {
    const { t, dir } = useLanguage();
    const { handleSuccess, handleAlert } = useNotificationContext();

    const handleClick = () => {
        const textToCopy = formatCopy(activity.activity);
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                handleSuccess(t('articleOptions.copy.success'));
            })
            .catch((error) => {
                handleAlert(t('articleOptions.copy.error'));
            });
    };

    return (
        <div className={`${styles.copyBtn} ${styles[dir]}`} onClick={handleClick}>
            <FaRegCopy className={styles.icon} />
            <span className={styles.text}>{t('articleOptions.copy.button')}</span>
        </div>
    );
};
export default ArtOptCopy;

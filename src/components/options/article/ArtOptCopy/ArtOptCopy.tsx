import React from "react";
import styles from "./ArtOptCopy.module.css";
<<<<<<< HEAD
import { FaRegCopy } from "react-icons/fa";
import { Activity } from "../../../../models/types/activity";
import { formatCopy } from "../../../../utils/format";
import { useErrorContext } from "../../../../context/ErrorContext";
import { useLanguage } from "../../../../i18n/useLanguage";
=======
import { Activity } from "../../../../models/types/activity";
import { FaRegCopy } from "react-icons/fa6";
import { useErrorContext } from "../../../../context/ErrorContext";
import { formatCopy } from "../../../../utils/format";
import { useTranslation } from "react-i18next";
>>>>>>> d1ff204286df86a9e32b6b36dcc3caaba496fb5c

type ArtOptCopyProps = {
    activity: Activity;
};

const ArtOptCopy: React.FC<ArtOptCopyProps> = ({ activity }) => {
    const { t, dir } = useLanguage();
    const { handleSuccess, handleError } = useErrorContext();

    const handleClick = () => {
        const textToCopy = formatCopy(activity.activity);
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                handleSuccess(t('articleOptions.copy.success'));
            })
            .catch((error) => {
                handleError(t('articleOptions.copy.error'));
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

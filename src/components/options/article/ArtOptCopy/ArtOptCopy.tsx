import React from "react";
import styles from "./ArtOptCopy.module.css";
import { Activity } from "../../../../models/types/activity";
import { FaRegCopy } from "react-icons/fa6";
import { useErrorContext } from "../../../../context/ErrorContext";
import { formatCopy } from "../../../../utils/format";
import { useTranslation } from "react-i18next";

type ArtOptCopyProps = {
    activity: Activity;
};

const ArtOptCopy: React.FC<ArtOptCopyProps> = ({ activity }) => {
    const { handleSuccess, handleError } = useErrorContext();
    const { t } = useTranslation();

    const handleClick = () => {
        const textToCopy = formatCopy(activity.activity);
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                handleSuccess(t("activity.copy.success"));
            })
            .catch((error) => {
                handleError(t("activity.copy.error"));
            });
    };

    return (
        <div className={styles.copyBtn} onClick={handleClick}>
            <FaRegCopy className={styles.icon} />
            <span className={styles.text}>{t("activity.copy.button")}</span>
        </div>
    );
};
export default ArtOptCopy;

import React from "react";
import styles from "./ArtOptCopy.module.css";
import { Activity } from "../../../../models/types/activity";
import { FaRegCopy } from "react-icons/fa6";
import { useErrorContext } from "../../../../context/ErrorContext";
import { formatCopy } from "../../../../utils/format";

type ArtOptCopyProps = {
    activity: Activity;
};

const ArtOptCopy: React.FC<ArtOptCopyProps> = ({ activity }) => {
    const { handleSuccess, handleError } = useErrorContext();

    const handleClick = () => {
        const textToCopy = formatCopy(activity.activity);
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                handleSuccess("הפעולה הועתקה בהצלחה 🎉");
            })
            .catch((error) => {
                handleError("העתקת הטקסט נכשלה.");
            });
    };

    return (
        <div className={styles.copyBtn} onClick={handleClick}>
            <FaRegCopy className={styles.icon} />
            <span className={styles.text}>העתקה</span>
        </div>
    );
};
export default ArtOptCopy;

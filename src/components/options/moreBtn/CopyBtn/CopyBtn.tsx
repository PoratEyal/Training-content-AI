import React, { useState, useEffect } from "react";
import styles from "./CopyBtn.module.css";
import { Activity } from "../../../../models/types/activity";
import { FaRegCopy, FaCopy } from "react-icons/fa6";
import { useErrorContext } from "../../../../context/ErrorContext";
import { formatCopy } from "../../../../utils/format";

type CopyBtnProps = {
    activity: Activity;
};

const CopyBtn: React.FC<CopyBtnProps> = ({ activity }) => {
    const [isCopied, setIsCopied] = useState(false);
    const { handleSuccess, handleError } = useErrorContext();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isCopied) {
            timer = setTimeout(() => {
                setIsCopied(false);
            }, 700);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isCopied]);

    const handleClick = () => {
        const textToCopy = formatCopy(activity.activity);
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                setIsCopied(true);
                handleSuccess("הפעולה הועתקה בהצלחה 🎉");
            })
            .catch((error) => {
                handleError("העתקת הטקסט נכשלה.");
            });
    };

    return (
        <div className={styles.copyBtn} onClick={handleClick}>
            <FaRegCopy className={`${styles.icon} ${isCopied ? styles.fadeOut : styles.fadeIn}`} />
            <FaCopy className={`${styles.icon} ${isCopied ? styles.fadeIn : styles.fadeOut}`} />
        </div>
    );
};
export default CopyBtn;

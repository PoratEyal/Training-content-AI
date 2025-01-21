import React, { useState, useEffect } from "react";
import styles from "./CopyBtn.module.css";
import { Activity } from "../../../../models/types/activity";
import { FaRegCopy, FaCopy } from "react-icons/fa6";
import { useErrorContext } from "../../../../context/ErrorContext";
import { motion } from "framer-motion";

type CopyBtnProps = {
    index: number;
    buttonVariants: any;
    activity: Activity;
};

const CopyBtn: React.FC<CopyBtnProps> = ({ index, buttonVariants, activity }) => {
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
        const textToCopy = activity.activity;

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
        <motion.div
            className={styles.copyBtn}
            onClick={handleClick}
            // custom={options.length - 1 - index}
            custom={4 - 1 - index}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <FaRegCopy className={`${styles.icon} ${isCopied ? styles.fadeOut : styles.fadeIn}`} />
            <FaCopy className={`${styles.icon} ${isCopied ? styles.fadeIn : styles.fadeOut}`} />
        </motion.div>
    );
};

export default CopyBtn;

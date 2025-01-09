// CopyBtn.tsx
import React, { useState, useEffect } from "react";
import styles from "./CopyBtn.module.css";
import { Activity, StaticActivities } from "../../../models/types/activity";
import { FaRegCopy, FaCopy } from "react-icons/fa6";
import { useErrorContext } from "../../../context/ErrorContext";
import { formatStaticActivity } from "../formatStaticActivity";

interface CopyBtnProps {
  activity: Activity | StaticActivities;
}

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
    let textToCopy: string;

    if ("activity" in activity) {
      textToCopy = activity.activity;
    } else {
      textToCopy = formatStaticActivity(activity.content);
    }

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        handleSuccess("הפעולה הועתקה בהצלחה 🎉");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        handleError("העתקת הטקסט נכשלה.");
      });
  };

  return (
    <div className={styles.copyBtn} onClick={handleClick}>
      <FaRegCopy
        className={`${styles.icon} ${isCopied ? styles.fadeOut : styles.fadeIn}`}
      />
      <FaCopy
        className={`${styles.icon} ${isCopied ? styles.fadeIn : styles.fadeOut}`}
      />
    </div>
  );
};

export default CopyBtn;

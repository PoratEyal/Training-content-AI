// ShareBtn.tsx
import React, { useState } from "react";
import styles from "./ShareBtn.module.css";
import { Activity } from "../../../models/types/activity";
import { FaShare } from "react-icons/fa";

interface ShareBtnProps {
  activity: Activity;
}

const ShareBtn: React.FC<ShareBtnProps> = ({ activity }) => {
  const [isShared, setIsShared] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const shareData = {
      title: "Check out this activity!",
      text: activity.activity,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setIsShared(true);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.error("Error sharing:");
    }
  };

  return (
    <div className={styles.shareBtn} onClick={handleClick}>
      <FaShare className={styles.icon} />
    </div>
  );
};

export default ShareBtn;

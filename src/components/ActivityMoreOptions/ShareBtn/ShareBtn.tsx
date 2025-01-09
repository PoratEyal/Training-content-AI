import React from "react";
import styles from "./ShareBtn.module.css";
import { Activity } from "../../../models/types/activity";
import { FaShare } from "react-icons/fa";

type ShareBtnProps = {
  activity: Activity;
}

const ShareBtn: React.FC<ShareBtnProps> = ({ activity }) => {
  const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const shareText = activity.activity

    const shareData = {
      title: "Check out this activity!",
      text: shareText,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.error("Share not supported by the browser");
    }
  };

  return (
    <div className={styles.shareBtn} onClick={handleClick}>
      <FaShare className={styles.icon} />
    </div>
  );
};

export default ShareBtn;

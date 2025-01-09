// ShareBtn.tsx
import React, { useState } from "react";
import styles from "./ShareBtn.module.css";
import { Activity, StaticActivities } from "../../../models/types/activity";
import { FaShare } from "react-icons/fa";
import { formatStaticActivity } from "../formatStaticActivity";

interface ShareBtnProps {
  activity: Activity | StaticActivities;
}

const ShareBtn: React.FC<ShareBtnProps> = ({ activity }) => {
  const [isShared, setIsShared] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const shareText =
      "activity" in activity
        ? activity.activity
        : formatStaticActivity(activity.content);

    const shareData = {
      title: "Check out this activity!",
      text: shareText,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setIsShared(true);
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

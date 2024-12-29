// MoreBtn.tsx
import React, { useState } from "react";
import styles from "./MoreBtn.module.css";
import SaveBtn from "../SaveBtn/SaveBtn";
import { Activity } from "../../../models/types/activity";
import CopyBtn from "../CopyBtn/CopyBtn";
import { FiMoreHorizontal } from "react-icons/fi";
import ShareBtn from "../ShareBtn/ShareBtn";
import EditBtn from "../EditBtn/EditBtn";

interface MoreBtnProps {
  activity: Activity;
}

const MoreBtn: React.FC<MoreBtnProps> = ({ activity }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <div className={styles.moreBtnWrapper}>
      <div className={styles.moreBtnContainer}>
        <FiMoreHorizontal
          className={`${styles.icon} ${
            isClicked ? styles.rotated : ""
          }`}
          onClick={handleClick} // Attach onClick here
        />
        <div
          className={`${styles.saveBtnContainer} ${
            isClicked ? styles.showSaveBtn : ""
          }`}
        >
          <SaveBtn activity={activity} />
          <CopyBtn activity={activity} />
          <ShareBtn activity={activity} />
          <EditBtn activity={activity} />
        </div>
      </div>
    </div>
  );
};

export default MoreBtn;

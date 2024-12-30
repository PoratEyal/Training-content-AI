import React, { useState } from "react";
import styles from "./MoreBtn.module.css";
import SaveBtn from "../SaveBtn/SaveBtn";
import { Activity } from "../../../models/types/activity";
import CopyBtn from "../CopyBtn/CopyBtn";
import { FiMoreHorizontal } from "react-icons/fi";
import ShareBtn from "../ShareBtn/ShareBtn";
import EditBtn from "../EditBtn/EditBtn";
import { StaticActivities } from "../../../models/types/activity";

interface MoreBtnProps {
  activity?: Activity ;
  save: boolean;
  staticActivity?: StaticActivities;
  edit: boolean;
}

const MoreBtn: React.FC<MoreBtnProps> = ({ activity, save, staticActivity, edit }) => {
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
          onClick={handleClick}
        />
        <div
          className={`${styles.saveBtnContainer} ${
            isClicked ? styles.showSaveBtn : ""
          }`}
        >
          {save ? <SaveBtn activity={activity} /> : null}
          <CopyBtn activity={activity} />
          <ShareBtn activity={activity} />
          {edit ? <EditBtn activity={activity} /> : null}
        </div>
      </div>
    </div>
  );
};

export default MoreBtn;

import React, { useState } from "react";
import styles from "./MoreBtn.module.css";
import SaveBtn from "../SaveBtn/SaveBtn";
import CopyBtn from "../CopyBtn/CopyBtn";
import ShareBtn from "../ShareBtn/ShareBtn";
import EditBtn from "../EditBtn/EditBtn";
import { TfiMoreAlt } from "react-icons/tfi";
import { Activity } from "../../../models/types/activity";

type MoreBtnProps = {
  activity: Activity;
  isSave: boolean;
  isEdit: boolean;
}

const MoreBtn: React.FC<MoreBtnProps> = ({ activity, isSave, isEdit }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <div className={styles.moreBtnWrapper}>
      <div className={styles.moreBtnContainer} onClick={handleClick}>
        <TfiMoreAlt
          className={`${styles.icon} ${
            isClicked ? styles.rotated : ""
          }`}
        />
        <div className={`${styles.saveBtnContainer} ${isClicked ? styles.showSaveBtn : ""}`}
        >
          <CopyBtn activity={activity} />
          <ShareBtn activity={activity} />
          {isSave && <SaveBtn activity={activity} />}
          {/* {isEdit && <EditBtn />} */}
        </div>
      </div>
    </div>
  );
};

export default MoreBtn;

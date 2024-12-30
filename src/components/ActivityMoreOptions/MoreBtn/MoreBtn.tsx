import React, { useState } from "react";
import styles from "./MoreBtn.module.css";
import SaveBtn from "../SaveBtn/SaveBtn";
import CopyBtn from "../CopyBtn/CopyBtn";
import { FiMoreHorizontal } from "react-icons/fi";
import ShareBtn from "../ShareBtn/ShareBtn";
import EditBtn from "../EditBtn/EditBtn";
import { IoIosMore } from "react-icons/io";
import { TfiMoreAlt } from "react-icons/tfi";

interface MoreBtnProps {
  //ToDo : Change any to Activity or StaticActivities
  activity?: any ;
  save: boolean;
  edit: boolean;
}

const MoreBtn: React.FC<MoreBtnProps> = ({ activity, save, edit }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <div className={styles.moreBtnWrapper}>
      <div className={styles.moreBtnContainer}>
        <TfiMoreAlt
          className={`${styles.icon} ${
            isClicked ? styles.rotated : ""
          }`}
          onClick={handleClick}
        />
        <div className={`${styles.saveBtnContainer} ${ isClicked ? styles.showSaveBtn : ""}`}
        >
          <CopyBtn activity={activity} />
          <ShareBtn activity={activity} />
          {save && <SaveBtn activity={activity} />}
          {edit && <EditBtn activity={activity} />}
        </div>
      </div>
    </div>
  );
};

export default MoreBtn;

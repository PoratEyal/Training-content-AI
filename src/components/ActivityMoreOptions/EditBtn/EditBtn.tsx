import React, { useState } from "react";
import styles from "./EditBtn.module.css";
import { Activity } from "../../../models/types/activity";
import { AiFillEdit } from "react-icons/ai";

interface ShareBtnProps {
  activity: Activity;
}

const EditBtn: React.FC<ShareBtnProps> = ({ activity }) => {

  return (
    <div className={styles.EditBtn}>
      <AiFillEdit className={styles.icon} />
    </div>
  );
};

export default EditBtn;

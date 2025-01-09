import React from "react";
import styles from "./EditBtn.module.css";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import route from "../../../router/route.json";

const EditBtn: React.FC = () => {
  return (
    <Link to={route.edit} className={styles.editBtn}>
      <AiFillEdit className={styles.icon} />
    </Link>
  );
};

export default EditBtn;

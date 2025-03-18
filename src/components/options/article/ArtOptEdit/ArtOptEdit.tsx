import React from "react";
import styles from "./ArtOptEdit.module.css";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import route from "../../../../router/route.json";
import { Activity } from "../../../../models/types/activity";
import { useContentContext } from "../../../../context/ContentContext";

type ArtOptEditProps = {
    activity: Activity;
};

const ArtOptEdit: React.FC<ArtOptEditProps> = ({ activity }) => {
    const { updateMainActivity } = useContentContext();
    const handleChangeMainActivity = () => {
        updateMainActivity(activity);
    };

    return (
        <Link to={route.edit} onClick={handleChangeMainActivity} className={styles.editBtn}>
            <AiFillEdit className={styles.icon} />
            <span className={styles.text}>עריכה</span>
        </Link>
    );
};
export default ArtOptEdit;

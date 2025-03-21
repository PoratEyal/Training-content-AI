import React from "react";
import styles from "./ArtOptEdit.module.css";
import { MdOutlineModeEdit } from "react-icons/md";
import { Activity } from "../../../../models/types/activity";
import { useContentContext } from "../../../../context/ContentContext";
import { useActivityContext } from "../../../../context/ActivityContext";

type ArtOptEditProps = {
    activity: Activity;
};

const ArtOptEdit: React.FC<ArtOptEditProps> = ({ activity }) => {
    const { updateMainActivity } = useContentContext();
    const { setIsEdit } = useActivityContext();

    const handleChangeMainActivity = () => {
        updateMainActivity(activity);
        setIsEdit(true);
    };

    return (
        <div onClick={handleChangeMainActivity} className={styles.editBtn}>
            <MdOutlineModeEdit className={styles.icon} />
            <span className={styles.text}>עריכה</span>
        </div>
    );
};
export default ArtOptEdit;

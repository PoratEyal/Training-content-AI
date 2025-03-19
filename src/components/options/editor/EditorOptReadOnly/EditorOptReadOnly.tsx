import React from "react";
import styles from "./EditorOptReadOnly.module.css";
import { Activity } from "../../../../models/types/activity";
import { useContentContext } from "../../../../context/ContentContext";
import { MdOutlineEditOff } from "react-icons/md";
import { useActivityContext } from "../../../../context/ActivityContext";

type EditorOptViewProps = {
    activity: Activity;
};

const EditorOptReadOnly: React.FC<EditorOptViewProps> = ({ activity }) => {
    const { updateMainActivity } = useContentContext();
    const { setIsEdit } = useActivityContext();

    const handleChangeMainActivity = () => {
        updateMainActivity(activity);
        setIsEdit(false);
    };

    return (
        <div onClick={handleChangeMainActivity} className={styles.editBtn}>
            <MdOutlineEditOff className={styles.icon} />
            <span className={styles.text}>קריאה</span>
        </div>
    );
};

export default EditorOptReadOnly;

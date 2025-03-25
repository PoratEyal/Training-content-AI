import React from "react";
import styles from "./ArtOptEdit.module.css";
import { MdOutlineModeEdit } from "react-icons/md";
import { Activity } from "../../../../models/types/activity";
import { useEditorContext } from "../../../../context/EditorContext";

type ArtOptEditProps = {
    activity: Activity;
};

const ArtOptEdit: React.FC<ArtOptEditProps> = ({ activity }) => {
    const { editMode } = useEditorContext();

    const handleChangeMainActivity = () => {
        editMode(activity);
    };

    return (
        <div onClick={handleChangeMainActivity} className={styles.editBtn}>
            <MdOutlineModeEdit className={styles.icon} />
            <span className={styles.text}>עריכה</span>
        </div>
    );
};
export default ArtOptEdit;

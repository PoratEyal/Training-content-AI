import React from "react";
import styles from "./ArtOptEdit.module.css";
import { MdOutlineModeEdit } from "react-icons/md";
import { Activity } from "../../../../models/types/activity";
import { useEditorContext } from "../../../../context/EditorContext";
import { useLanguage } from "../../../../i18n/useLanguage";

type ArtOptEditProps = {
    activity: Activity;
};

const ArtOptEdit: React.FC<ArtOptEditProps> = ({ activity }) => {
    const { t, dir } = useLanguage();
    const { editMode } = useEditorContext();

    const handleChangeMainActivity = () => {
        editMode(activity);
    };

    return (
        <div onClick={handleChangeMainActivity} className={`${styles.editBtn} ${styles[dir]}`}>
            <MdOutlineModeEdit className={styles.icon} />
            <span className={styles.text}>{t('articleOptions.edit')}</span>
        </div>
    );
};
export default ArtOptEdit;

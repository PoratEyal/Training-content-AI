import React from "react";
import styles from "./SavedActivityRow.module.css";
import { Activity } from "../../models/types/activity";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";

type SavedActivityRowProps = {
    activity: Activity;
    openDeletePopup: (activity: Activity) => void
};

const SavedActivityRow: React.FC<SavedActivityRowProps> = ({ activity, openDeletePopup }) => {
    const navigate = useNavigate();

    const goToActivity = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!(e.target as Element).closest(".delete_icon")) {
            navigate(`${route.myactivities}/${activity.subject}`);
        }
    };

    return (
        <div
            className={styles.grid_item}
            onClick={(e) => goToActivity(e)}
        >
            <h2 className={styles.item_title}>{activity.subject}</h2>
            <label
                className={`${styles.delete_icon} delete_icon`}
                onClick={() => openDeletePopup(activity)}
            >
                X
            </label>
        </div>
    );
};

export default SavedActivityRow;

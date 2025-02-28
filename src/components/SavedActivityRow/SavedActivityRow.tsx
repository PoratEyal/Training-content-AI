import React from "react";
import styles from "./SavedActivityRow.module.css";
import { Activity } from "../../models/types/activity";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";

type SavedActivityRowProps = {
    activity: Activity;
    openDeletePopup: (activity: Activity) => void;
};

const SavedActivityRow: React.FC<SavedActivityRowProps> = ({ activity, openDeletePopup }) => {
    const navigate = useNavigate();

    const goToActivity = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!(e.target as Element).closest(".delete_icon")) {
            navigate(`${route.myactivities}/${activity.subject}`);
        }
    };

    const time = `עדכון אחרון: ${new Date(activity.savedAt).toLocaleDateString([], {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
    })} ${new Date(activity.savedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })}`;

    return (
        <div className={styles.grid_item} onClick={(e) => goToActivity(e)}>
            <div className={styles.content_section}>
                <h2 className={styles.item_title}>{activity.subject}</h2>
                {activity.savedAt && <span className={styles.saved_date}>{time}</span>}
            </div>
            <button
                className={`${styles.delete_icon} delete_icon`}
                onClick={() => openDeletePopup(activity)}
            >
                ✕
            </button>
        </div>
    );
};

export default SavedActivityRow;

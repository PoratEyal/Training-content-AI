import React, { useState } from "react";
import styles from "./SaveBtn.module.css";
import { useAuthContext } from "../../context/AuthContext";
import { useErrorContext } from "../../context/ErrorContext";
import { Activity } from "../../models/types/activity";
import { fetchRemoveActivity, fetchSaveActivity } from "../../utils/fetch";
import { RemoveActivityRequest } from "../../models/types/api/request";

type SaveBtnProps = {
    activity: Activity;
};

const SaveBtn: React.FC<SaveBtnProps> = ({ activity }) => {
    const { currentUser } = useAuthContext();
    const { handleSuccess, handleError } = useErrorContext();
    const [saved, setSaved] = useState<boolean>(false);
    const [activityId, setActivityId] = useState<string | undefined>();
    //TODO: add queryparam if save or not insted of checking db

    const handleSave = async () => {
        if (currentUser && currentUser.id && activity) {
            try {
                setSaved(true);
                handleSuccess("שמרנו את הפעולה! תוכלו למצוא אותה באזור הפעולות שלי");
                const res = await fetchSaveActivity(activity);
                setActivityId(res.activity.id);
            } catch (error) {
                handleError("הפעולה לא נשמרה, אנא נסו שנית");
                setSaved(false);
            }
        }
    };

    const handleUnsave = async () => {
        if (currentUser && currentUser.id && activityId) {
            try {
                setSaved(false);
                handleSuccess("הפעולה הוסרה מאזור הפעולות שלי");
                await fetchRemoveActivity({
                    userId: currentUser.id,
                    activityId,
                } as RemoveActivityRequest);
            } catch (error) {
                handleError("הפעולה לא נשמרה, אנא נסו שנית");
                setSaved(false);
            }
        }
    };

    return (
        <div
            className={`${styles.bookmark} ${saved ? styles.checked : ""}`}
            onClick={saved ? handleUnsave : handleSave}
            role="button"
            aria-pressed={saved}
        >
            <svg
                className={styles.svgIcon}
                viewBox="0 0 50 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M46 62.0085L46 3.88139L3.99609 3.88139L3.99609 62.0085L24.5 45.5L46 62.0085Z"></path>
            </svg>
        </div>
    );
};

export default SaveBtn;

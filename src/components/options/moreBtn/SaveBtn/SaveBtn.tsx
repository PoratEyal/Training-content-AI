import React, { useEffect, useState } from "react";
import styles from "./SaveBtn.module.css";
import { useAuthContext } from "../../../../context/AuthContext";
import { useErrorContext } from "../../../../context/ErrorContext";
import { useQueryParam } from "../../../../hooks/useQueryParam";
import { useSaveContext } from "../../../../context/SavedContext";
import { Activity } from "../../../../models/types/activity";
import { fetchSaveActivity } from "../../../../utils/fetch";
import { useContentContext } from "../../../../context/ContentContext";

type SaveBtnProps = {
    activity: Activity;
};

const SaveBtn: React.FC<SaveBtnProps> = ({ activity }) => {
    const { currentParam, updateParam } = useQueryParam();
    const { currentUser } = useAuthContext();
    const { updateMainActivity } = useContentContext();
    const { handleSuccess, handleError } = useErrorContext();
    const { getSavedActivities, deleteActivity } = useSaveContext();

    const [saved, setSaved] = useState<boolean>(false);
    const [activityId, setActivityId] = useState<string | undefined>();

    // Initialize 'saved' state based on query parameter
    useEffect(() => {
        setSaved(currentParam.isSaved === "true");
    }, [currentParam]);

    const handleSave = async () => {
        if (!currentUser?.id) return;

        try {
            updateParam(true);
            handleSuccess("הפעולה נשמרה בהצלחה! תוכלו למצוא אותה באזור הפעולות שלי");

            const res = await fetchSaveActivity(activity);
            setActivityId(res.activity.id);
            updateMainActivity({ ...activity, id: res.activity.id } as Activity);
            await getSavedActivities();
            setSaved(true);
        } catch (error) {
            handleError("הפעולה לא נשמרה, אנא נסו שנית");
            updateParam(false);
        }
    };

    const handleUnsave = async () => {
        // TODO: if navigate back I dont have the activity id for delete
        if (!currentUser?.id || !activityId) return;

        try {
            updateParam(false);
            handleSuccess("הפעולה הוסרה מאזור הפעולות שלי");
            await deleteActivity(activityId);
            setSaved(false);
        } catch (error) {
            handleError("הפעולה לא נשמרה, אנא נסו שנית");
            updateParam(true);
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
                <path d="M46 62.0085L46 3.88139L3.99609 3.88139L3.99609 62.0085L24.5 45.5L46 62.0085Z" />
            </svg>
        </div>
    );
};

export default SaveBtn;

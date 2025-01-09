import React, { useEffect, useState } from "react";
import styles from "./SaveBtn.module.css";
import { useAuthContext } from "../../../context/AuthContext";
import { useErrorContext } from "../../../context/ErrorContext";
import { useQueryParam } from "../../../hooks/useQueryParam";
import { useSaveContext } from "../../../context/SavedContext";
import {Activity, StaticActivities} from "../../../models/types/activity";
import { fetchSaveActivity } from "../../../utils/fetch";
import { convertStaticToActivity, isStaticActivities } from "../SaveBtn/activityTransform";

type SaveBtnProps = {
  activity: Activity | StaticActivities;
};

const SaveBtn: React.FC<SaveBtnProps> = ({ activity }) => {
  const { currentParam, updateParam } = useQueryParam();
  const { currentUser } = useAuthContext();
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

    // 1) If it's actually a StaticActivities, convert it.
    // 2) Otherwise, it's already an Activity.
    let activityToSave: Activity;
    if (isStaticActivities(activity)) {
      activityToSave = convertStaticToActivity(activity, currentUser.id);
    } else {
      activityToSave = activity;
    }

    try {
      updateParam(true);
      handleSuccess("הפעולה נשמרה בהצלחה! תוכלו למצוא אותה באזור הפעולות שלי");

      // Reuse your existing function
      const res = await fetchSaveActivity(activityToSave);

      // The server presumably returns an 'activity' with an 'id'
      setActivityId(res.activity.id);

      // Refresh the saved activities in context
      await getSavedActivities();
      setSaved(true);

    } catch (error) {
      console.error(error);
      handleError("הפעולה לא נשמרה, אנא נסו שנית");
      updateParam(false);
    }
  };

  const handleUnsave = async () => {
    if (!currentUser?.id || !activityId) return;

    try {
      updateParam(false);
      handleSuccess("הפעולה הוסרה מאזור הפעולות שלי");
      await deleteActivity(activityId);
      setSaved(false);
    } catch (error) {
      console.error(error);
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

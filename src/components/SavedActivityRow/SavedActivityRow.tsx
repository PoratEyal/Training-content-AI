//
// This component renders a single saved activity row in the My Activities page.
// It includes the activity title, the last saved date, and a delete button.
// Clicking on the row (not the delete button) navigates to the activity details page
// in the user’s currently selected language.
//
import React from "react";
import styles from "./SavedActivityRow.module.css";
import { Activity } from "../../models/types/activity";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";
import { useLanguage } from "../../i18n/useLanguage";

type SavedActivityRowProps = {
  activity: Activity;
  openDeletePopup: (activity: Activity) => void;
};

const SavedActivityRow: React.FC<SavedActivityRowProps> = ({ activity, openDeletePopup }) => {
  const { dir, lang, t } = useLanguage();
  const navigate = useNavigate();

  // Determine the language-specific path for My Saved Activities (fallback to Hebrew)
  const myActivitiesPath =
    route[`MY_Activities${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.MY_ActivitiesHe;

  const goToActivity = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!(e.target as Element).closest(".delete_icon")) {
      navigate(`${myActivitiesPath}/${activity.subject}`);
    }
  };

  const time = `${t("savedActivities.lastUpdate")}: ${new Date(activity.savedAt).toLocaleDateString([], {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  })} ${new Date(activity.savedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}`;

  return (
    <div
      className={styles.grid_item}
      style={{ direction: dir }}
      onClick={goToActivity}
    >
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

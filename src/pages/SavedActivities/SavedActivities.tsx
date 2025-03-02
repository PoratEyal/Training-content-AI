import "../../components/ActivityOutput/Markdown.css";
import styles from "./SavedActivities.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { useNavigate } from "react-router-dom";
import MyActivitiesTitle from "../../components/titles/MyActivitiesTitle/MyActivitiesTitle";
import helmet from "../../models/resources/helmet.json";
import { MY_ACTIVITIES_AD_SLOT } from "../../models/constants/adsSlot";
import PageLoading from "../../components/Loading/PageLoading/PageLoading";
import DontHaveActivity from "../../components/DontHaveActivity/DontHaveActivity";
import { useSaveContext } from "../../context/SavedContext";
import { Activity } from "../../models/types/activity";
import React, { useState } from "react";
import DeletePopUp from "../../components/DeletePopUp/DeletePopUp";

// 1) import i18n
import { useTranslation } from "react-i18next";

const SavedActivities: React.FC = () => {
  const navigate = useNavigate();

  // 2) detect if Hebrew
  const { i18n } = useTranslation();
  const isHebrew = i18n.language === "he";

  const { savedActivity, isLoading, useFetchSavedData, deleteActivity } = useSaveContext();
  useFetchSavedData();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState<Activity | null>(null);

  const goBack = () => {
    navigate(route.home);
  };

  const openDeletePopup = (activity: Activity) => {
    setActivityToDelete(activity);
    setIsPopupOpen(true);
  };

  const closeDeletePopup = () => {
    setIsPopupOpen(false);
    setActivityToDelete(null);
  };

  const confirmDelete = async () => {
    if (activityToDelete) {
      await deleteActivity(activityToDelete.id);
    }
  };

  return (
    <PageLayout
      path={route.myactivities}
      hasHeader={{ goBack }}
      hasNavBar
      hesAds={MY_ACTIVITIES_AD_SLOT}
      index={false}
      hasGreenBackground
      title={helmet.content.title}
      content={helmet.home.content}
    >
      <MyActivitiesTitle />
      <DeletePopUp
        isOpen={isPopupOpen}
        onClose={closeDeletePopup}
        onDelete={confirmDelete}
        activityName={activityToDelete?.subject || ""}
      />
      <article className={styles.content_article}>
        {isLoading ? (
          <section className={styles.grid_container}>
            <PageLoading />
          </section>
        ) : savedActivity?.length === 0 ? (
          <section className={styles.grid_container}>
            <DontHaveActivity />
          </section>
        ) : (
          <section className={styles.grid_container}>
            {savedActivity?.map((activity, index) => (
              <div
                key={index}
                // 3) Conditionally add .ltr_item if NOT Hebrew
                className={
                  isHebrew
                    ? styles.grid_item
                    : `${styles.grid_item} ${styles.ltr_item}`
                }
                onClick={(e) => {
                  // If user didn't click the delete icon, navigate
                  if (!(e.target as Element).closest(".delete_icon")) {
                    navigate(`${route.myactivities}/${activity.subject}`);
                  }
                }}
              >
                <h2 className={styles.item_title}>{activity.subject}</h2>
                <label
                  className={`${styles.delete_icon} delete_icon`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeletePopup(activity);
                  }}
                >
                  X
                </label>
              </div>
            ))}
          </section>
        )}
      </article>
    </PageLayout>
  );
};

export default SavedActivities;

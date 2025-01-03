import "../../components/ActivityOutput/Markdown.css";
import styles from "./SavedActivities.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { useNavigate } from "react-router-dom";
import MyActivitiesTitle from "../../components/titles/MyActivitiesTitle/MyActivitiesTitle";
import helmet from "../../models/resources/helmet.json";
import { MY_ACTIVITIES_AD_SLOT } from "../../models/constants/adsSlot";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import DontHaveActivity from "../../components/DontHaveActivity/DontHaveActivity";
import { useSaveContext } from "../../context/SavedContext";
import { Activity } from "../../models/types/activity";
import React, { useState } from "react";
import DeletePopUp from "../../components/DeletePopUp/DeletePopUp";

const SavedActivities: React.FC = () => {
  const navigate = useNavigate();
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
            <SmallLoading />
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
                className={styles.grid_item}
                onClick={(e) => {
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

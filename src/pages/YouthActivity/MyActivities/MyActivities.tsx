/**
 * This page displays a list of activities that the user has saved.
 * If no activities are saved, it displays a message informing the user that they have no saved activities.
 * The user can also delete saved activities through a confirmation popup (`DeletePopUp`), which allows them to remove a selected activity.
 */
import styles from "./MyActivities.module.css";
import React, { useState, useMemo } from "react";
import "../../../components/ActivityOutput/Markdown.css";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import route from "../../../router/route.json";
import { MY_ACTIVITIES_AD_SLOT } from "../../../models/constants/adsSlot";
import PageLoading from "../../../components/Loading/PageLoading/PageLoading";
import DontHaveActivity from "../../../components/DontHaveActivity/DontHaveActivity";
import { useSaveContext } from "../../../context/SavedContext";
import { Activity } from "../../../models/types/activity";
import DeletePopUp from "../../../components/PopupDelete/DeletePopUp";
import SavedActivityRow from "../../../components/SavedActivityRow/SavedActivityRow";
import { buildSavedActivitiesSchema } from "../../../models/schemaOrg";
import { useLanguage } from "../../../i18n/useLanguage";
import MyActivitiesTitle from "../../../components/titles/MyActivitiesTitle/MyActivitiesTitle";

const SavedActivities: React.FC = () => {
  const { savedActivity, isLoading, useFetchSavedData, deleteActivity } = useSaveContext();
  const { lang } = useLanguage(); // Handle active language

  useFetchSavedData();

  // Build JSON-LD schema based on saved activities
  const savedSchema = useMemo(() => {
    const capitalizedLang = lang.charAt(0).toUpperCase() + lang.slice(1);
    const path = route[`youthMyActivities${capitalizedLang}`] || route.youthMyActivitiesEn;
    return buildSavedActivitiesSchema(savedActivity || [], path);
  }, [savedActivity, lang]);


  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState<Activity | null>(null);

  // Open the delete popup for the selected activity
  const openDeletePopup = (activity: Activity) => {
    setActivityToDelete(activity);
    setIsPopupOpen(true);
  };

  // Close the delete popup
  const closeDeletePopup = () => {
    setIsPopupOpen(false);
    setActivityToDelete(null);
  };

  // Confirm and delete the activity
  const confirmDelete = async () => {
    if (activityToDelete) {
      await deleteActivity(activityToDelete.id);
    }
  };

  return (
    <PageLayout
      id="myactivities"
      projectType={"youth"}
      hasHeader={{}}
      hasNavBar
      hasAds={MY_ACTIVITIES_AD_SLOT}
      index={false}
      hasGreenBackground
    >
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(savedSchema)}</script>

      {/* Title of the page */}
      <MyActivitiesTitle />

      <article className={styles.content_article}>
        {isLoading ? (
          // Show loading animation while fetching activities
          <section className={styles.grid_container}>
            <PageLoading />
          </section>
        ) : savedActivity?.length === 0 ? (
          // Show placeholder if no saved activities
          <section className={styles.grid_container}>
            <DontHaveActivity />
          </section>
        ) : (
          // Show list of saved activities
          <section className={styles.grid_container}>
            {savedActivity?.map((activity, index) => (
              <SavedActivityRow
                key={index}
                activity={activity}
                openDeletePopup={openDeletePopup}
              />
            ))}
          </section>
        )}

        {/* Delete confirmation popup */}
        <DeletePopUp
          isOpen={isPopupOpen}
          onClose={closeDeletePopup}
          onDelete={confirmDelete}
          activityName={activityToDelete?.subject || ""}
        />
      </article>
    </PageLayout>
  );
};

export default SavedActivities;

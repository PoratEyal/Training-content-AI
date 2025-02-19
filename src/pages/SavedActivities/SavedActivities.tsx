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
import SavedActivityRow from "../../components/SavedActivityRow/SavedActivityRow";

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
                            <SavedActivityRow
                                key={index}
                                activity={activity}
                                openDeletePopup={openDeletePopup}
                            />
                        ))}
                    </section>
                )}
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

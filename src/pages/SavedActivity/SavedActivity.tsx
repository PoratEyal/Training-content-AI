import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../components/ActivityOutput/Markdown.css";
import styles from "./SavedActivity.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import ActivityReady from "../../components/titles/ActivityReady/ActivityReady";
import route from "../../router/route.json";
import { MY_ACTIVITIES_AD_SLOT } from "../../models/constants/adsSlot";
import ActivityOutputStatic from "../../components/ActivityOutput/ActivityOutputStatic";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import { useAuthContext } from "../../context/AuthContext";
import { Activity } from "../../models/types/activity";
import { fetchGetSavedActivities } from "../../utils/fetch";
import { useErrorContext } from "../../context/ErrorContext";
import msg from "../../models/resources/errorMsg.json";

function SavedActivity() {
    const { subject } = useParams<{ subject: string }>();
    const navigate = useNavigate();
    const { handleError } = useErrorContext();
    const { currentUser } = useAuthContext();
    const [activity, setActivity] = useState<Activity | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const goBack = () => {
        navigate(route.myactivities);
    };
    
    const getActivities = async () => {
        if (currentUser && currentUser.id && subject) {
            try {
                setIsLoading(true);
                const response = await fetchGetSavedActivities(currentUser.id);
                if (
                    (response.result === "success" || response.result === "safety") &&
                    response.activities
                ) {
                    const foundActivity = response.activities.find(
                        (act) => act.subject === subject,
                    );
                    if (foundActivity) {
                        setActivity(foundActivity);
                    }
                }
            } catch (error) {
                handleError(msg.error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        //TODO: calling another time to the DB to get the saved activities, need to come from the context
        getActivities();
    }, [currentUser, subject]);

    return (
        <PageLayout
            path={`${route.myactivities}/${subject}`}
            hasGreenBackground
            hasHeader={{ goBack }}
            hesAds={MY_ACTIVITIES_AD_SLOT}
            title={activity?.subject || ""}
            content={activity?.subject || ""}
            hasNavBar
            noIndex
        >
            <ActivityReady subject={activity?.subject} />

            {isLoading ? (
                <section className={styles.activity_data_container}>
                    <SmallLoading />
                </section>
            ) : activity && activity.activity ? (
                <section className={styles.activity_data_container}>
                    <article>
                        <ActivityOutputStatic activity={activity.activity} />
                    </article>
                    <div className={styles.padding} />
                </section>
            ) : (
                <section className={styles.activity_data_container}>
                    <div>הפעולה לא נמצאה</div>
                </section>
            )}
        </PageLayout>
    );
}

export default SavedActivity;

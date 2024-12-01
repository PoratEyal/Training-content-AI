import React, { useState, useEffect } from "react";
import "../../components/ActivityOutput/Markdown.css";
import styles from "./ContentActivity.module.css";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import ActivityReady from "../../components/titles/ActivityReady/ActivityReady";
import route from "../../router/route.json";
import { CONTENT_ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import ActivityOutputStatic from "../../components/ActivityOutput/ActivityOutputStatic";
import { fetchStaticSubjects } from "../../utils/staticActivitiesAPI";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";

function ContentActivity() {
    const navigate = useNavigate();
    const { activityId, contentId } = useParams();
    const [activity, setActivity] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const contentActivityPath = `${route.content}/${activityId}/${contentId}`;

    const goBack = () => {
        navigate(`${route.content}/${activityId}`);
    };

    useEffect(() => {
        const getActivity = async () => {
            try {
                const response = await fetchStaticSubjects();

                if (response.result === "success" && response.data) {
                    // Find the subject that matches the activityId
                    const subject = response.data.find((subject) => subject.name === activityId);
                    if (subject) {
                        // Find the activity that matches the contentId
                        const activityItem = subject.activities.find((act) => act.name === contentId);
                        if (activityItem) {
                            setActivity(activityItem);
                        } else {
                            console.error(`Activity not found for contentId: ${contentId}`);
                            goBack();
                        }
                    } else {
                        console.error(`Subject not found for activityId: ${activityId}`);
                        goBack();
                    }
                } else {
                    console.error("Error fetching activities:", response.message);
                }
            } catch (error) {
                console.error("Error in getActivity:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getActivity();
    }, [activityId, contentId, navigate]);

    return (
        <PageLayout
            path={contentActivityPath}
            hasGreenBackground
            hasHeader={{ goBack }}
            hesAds={CONTENT_ACTIVITY_AD_SLOT}
            title={activity ? activity.metaTitle : ""}
            content={activity ? activity.metaDescription : ""}
            hasNavBar
        >
            {activity && <ActivityReady subject={activity.metaTitle} />}
            <section className={styles.activity_data_container}>
                {isLoading ? (
                    <SmallLoading />
                ) : (
                    activity && (
                        <article>
                            <ActivityOutputStatic activity={activity.content} />
                        </article>
                    )
                )}
                <div className={styles.padding} />
            </section>
        </PageLayout>
    );
}

export default ContentActivity;

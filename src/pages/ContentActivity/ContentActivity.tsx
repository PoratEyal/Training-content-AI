import React from "react";
import "../../components/ActivityOutput/Markdown.css";
import styles from "./ContentActivity.module.css";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import ActivityReady from "../../components/titles/ActivityReady/ActivityReady";
import route from "../../router/route.json";
import { CONTENT_ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import ActivityOutputStatic from "../../components/ActivityOutput/ActivityOutputStatic";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import { useStaticContentContext } from "../../context/StaticContentContext";

function ContentActivity() {
    const navigate = useNavigate();
    const { activityId, contentId } = useParams<{ activityId: string; contentId: string }>();
    const { subjects, isLoading, error } = useStaticContentContext();
    const contentActivityPath = `${route.content}/${activityId}/${contentId}`;

    const goBack = () => {
        navigate(`${route.content}/${activityId}`);
    };

    let activity = null;
    let subject = null;

    if (!isLoading && !error && subjects) {
        subject = subjects.find((subj) => subj.name === activityId);
        if (subject) {
            activity = subject.activities.find((act) => act.name === contentId);
            if (!activity) {
                console.error(`Activity not found for contentId: ${contentId}`);
            }
        } else {
            console.error(`Subject not found for activityId: ${activityId}`);
        }
    }

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
            {isLoading ? (
                <section className={styles.activity_data_container}>
                    <SmallLoading />
                </section>
            ) : error ? (
                <section className={styles.activity_data_container}>
                    <div>Error: {error}</div>
                </section>
            ) : activity ? (
                <>
                    <ActivityReady subject={activity.metaTitle} />
                    <section className={styles.activity_data_container}>
                        <article>
                            <ActivityOutputStatic activity={activity.content} />
                        </article>
                        <div className={styles.padding} />
                    </section>
                </>
            ) : (
                <section className={styles.activity_data_container}>
                    <div>Activity not found.</div>
                </section>
            )}
        </PageLayout>
    );
}

export default ContentActivity;

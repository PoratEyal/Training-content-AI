import React from "react";
import "../../components/ActivityOutput/Markdown.css";
import styles from "./ContentActivities.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CONTENT_ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import ReadyContentName from "../../components/titles/ReadyContentName/ReadyContentName";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import { useStaticContentContext } from "../../context/StaticContentContext";

function ContentActivities() {
    const navigate = useNavigate();
    const { activityId } = useParams<{ activityId: string }>();
    const { subjects, isLoading, error } = useStaticContentContext();
    const contentActivitiesPath = route.contentActivities.replace(':activityId', activityId);

    const goBack = () => {
        navigate(route.content);
    };

    let subject = null;
    let activities = null;

    if (!isLoading && !error && subjects) {
        subject = subjects.find((subj) => subj.name === activityId);
        if (subject) {
            // Sort activities by orderId in ascending order
            activities = subject.activities.sort((a, b) => a.orderId - b.orderId);
        } else {
            console.error("Subject not found for activityId:", activityId);
        }
    }

    return (
        <PageLayout
            path={contentActivitiesPath}
            hasHeader={{ goBack }}
            hasNavBar
            hasGreenBackground
            title={subject ? subject.metaTitle : ''}
            content={subject ? subject.metaContent : ''}
            hesAds={CONTENT_ACTIVITY_AD_SLOT}
        >
            {isLoading ? (
                <SmallLoading />
            ) : error ? (
                <div>Error: {error}</div>
            ) : subject ? (
                <>
                    <ReadyContentName isMany subject={subject.metaTitle} />
                    <article className={styles.content_article}>
                        <section className={styles.grid_container}>
                            {activities && activities.length > 0 ? (
                                activities.map((activity, index) => (
                                    <Link
                                        to={`${route.content}/${activityId}/${activity.name}`}
                                        className={styles.grid_item}
                                        key={index}
                                    >
                                        <h2 className={styles.item_title}>{activity.metaTitle}</h2>
                                    </Link>
                                ))
                            ) : (
                                <div>No activities found.</div>
                            )}
                        </section>
                    </article>
                </>
            ) : (
                <div>Subject not found.</div>
            )}
        </PageLayout>
    );
}

export default ContentActivities;

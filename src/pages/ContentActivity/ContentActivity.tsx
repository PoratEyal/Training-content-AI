import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../../components/ActivityOutput/Markdown.css";
import styles from "./ContentActivity.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import ActivityReady from "../../components/titles/ActivityReady/ActivityReady";
import route from "../../router/route.json";
import { CONTENT_ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import ActivityOutputStatic from "../../components/ActivityOutput/ActivityOutputStatic";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import { useStaticContentContext } from "../../context/StaticContentContext";
import { StaticSubjects } from "../../models/interface/staticSubjects";
import { StaticActivities } from "../../models/interface/StaticActivities";

function ContentActivity() {
    const navigate = useNavigate();
    const location = useLocation();
    const { activityId, contentId } = useParams<{ activityId: string; contentId: string }>();
    const { subjects, isLoading } = useStaticContentContext();
    const contentActivityPath = `${route.content}/${activityId}/${contentId}`;

    // Extract fromPopular from location.state
    const { fromPopular } = location.state || {};

    const goBack = () => {
        if (fromPopular) {
            navigate(route.popularActivities);
        } else {
            navigate(`${route.content}/${activityId}`);
        }
    };

    let subject: StaticSubjects = null;
    let activity: StaticActivities = null;

    if (!isLoading && subjects) {
        subject = subjects.find((subj) => subj.name === activityId);
        activity = subject?.activities.find((act) => act.name === contentId);
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
            <ActivityReady subject={activity.metaTitle} />
            {isLoading ? (
                <section className={styles.activity_data_container}>
                    <SmallLoading />
                </section>
            ) : (
                <section className={styles.activity_data_container}>
                    {activity ? (
                        <article>
                            <ActivityOutputStatic activity={activity.content} />
                        </article>
                    ) : null}
                    <div className={styles.padding} />
                </section>
            )}
        </PageLayout>
    );
}

export default ContentActivity;

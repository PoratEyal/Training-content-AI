import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../../components/ActivityOutput/Markdown.css";
import styles from "./ContentActivity.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import ActivityReady from "../../components/titles/ActivityReady/ActivityReady";
import route from "../../router/route.json";
import { CONTENT_ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import ActivityOutputStatic from "../../components/ActivityOutput/ActivityOutputStatic";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import PageLoading from "../../components/Loading/PageLoading/PageLoading";
import { useStaticContentContext } from "../../context/StaticContentContext";
import { StaticActivities } from "../../models/types/activity";
import { useCallback, useEffect, useState } from "react";
import { fetchGetStaticActivity } from "../../utils/fetch";
import helmet from "../../models/resources/helmet.json";
import { useAuthContext } from "../../context/AuthContext";
import { convertActivityType } from "../../utils/activity";
import MoreOptionsBtn from "../../components/MoreOptionsBtn/MoreOptionsBtn";

function ContentActivity() {
    const navigate = useNavigate();
    const location = useLocation();
    const { activityId, contentId } = useParams<{ activityId: string; contentId: string }>();
    const { subjects, isLoading, useFetchSubjectsData } = useStaticContentContext();
    useFetchSubjectsData();
    const [isActivityLoading, setIsActivityLoading] = useState<boolean>(isLoading);
    const [activity, setActivity] = useState<StaticActivities | undefined>();
    const { isLoggedIn } = useAuthContext();

    const contentActivityPath = `${route.content}/${activityId}/${contentId}`;

    // Extract fromPopular with default value
    const fromPopular = location.state?.fromPopular ?? false;

    const goBack = () => {
        if (fromPopular) {
            navigate(route.popularActivities);
        } else {
            navigate(`${route.content}/${activityId}`);
        }
    };

    const fetchActivity = useCallback(async () => {
        try {
            setIsActivityLoading(true);
            const response = await fetchGetStaticActivity({ contentName: contentId });
            setActivity(response.activity);
        } catch (error) {
            console.error("Failed to fetch activity:", error);
        } finally {
            setIsActivityLoading(false);
        }
    }, [contentId]);

    useEffect(() => {
        if (subjects.length > 0) {
            const foundSubject = subjects.find((subj) => subj.name === activityId);
            const foundActivity = foundSubject?.activities?.find((act) => act.name === contentId);
            setActivity(foundActivity);
        } else {
            fetchActivity();
        }
    }, [subjects, activityId, contentId, fetchActivity]);

    useEffect(() => {
        setIsActivityLoading(isLoading);
    }, [isLoading]);

    return (
        <PageLayout
            path={contentActivityPath}
            hasGreenBackground
            hasHeader={{ goBack }}
            hesAds={CONTENT_ACTIVITY_AD_SLOT}
            title={activity?.metaTitle || helmet.contentActivity.title}
            content={activity?.metaDescription || helmet.contentActivity.content}
            hasNavBar
        >
            <ActivityReady subject={activity?.title || helmet.contentActivity.title} />
            {isActivityLoading ? (
                <section className={styles.activity_data_container}>
                    <PageLoading />
                </section>
            ) : activity ? (
                <section className={styles.activity_data_container}>
                    <article>
                        <ActivityOutputStatic activity={activity.content} />
                        <MoreOptionsBtn
                            activity={convertActivityType(activity)}
                            // hasSave={isLoggedIn}
                            hasCopy
                            hasShare
                        />
                    </article>
                    <div className={styles.padding} />
                </section>
            ) : (
                <section className={styles.activity_data_container}>
                    <SmallLoading />
                </section>
            )}
        </PageLayout>
    );
}

export default ContentActivity;

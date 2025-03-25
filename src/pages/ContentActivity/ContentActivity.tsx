import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../../components/ActivityOutput/Markdown.css";
import styles from "./ContentActivity.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { CONTENT_ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import PageLoading from "../../components/Loading/PageLoading/PageLoading";
import { useStaticContentContext } from "../../context/StaticContentContext";
import { StaticActivities } from "../../models/types/activity";
import { useCallback, useEffect, useState } from "react";
import { fetchGetStaticActivity } from "../../utils/fetch";
import helmet from "../../models/resources/helmet.json";
import { useAuthContext } from "../../context/AuthContext";
import { convertActivityType } from "../../utils/activity";
import ActivityArticle from "../../components/ActivityArticle/ActivityArticle";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import { useEditorContext } from "../../context/EditorContext";

function ContentActivity() {
    const navigate = useNavigate();
    const location = useLocation();
    const { activityId, contentId } = useParams<{ activityId: string; contentId: string }>();
    const { subjects, isLoading, useFetchSubjectsData } = useStaticContentContext();
    const { isEdit, readOnlyMode } = useEditorContext();
    useFetchSubjectsData();
    const [isActivityLoading, setIsActivityLoading] = useState<boolean>(isLoading);
    const [activity, setActivity] = useState<StaticActivities | undefined>();
    const { isLoggedIn, currentUser } = useAuthContext();

    const contentActivityPath = `${route.content}/${activityId}/${contentId}`;

    // Extract fromPopular with default value
    const fromPopular = location.state?.fromPopular ?? false;

    const goBack = () => {
        if (isEdit) {
            readOnlyMode();
        } else {
            if (fromPopular) {
                navigate(route.popularActivities);
            } else {
                navigate(`${route.content}/${activityId}`);
            }
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
            hasHeader={{ goBack, hasTitle: activity?.title || undefined }}
            hesAds={CONTENT_ACTIVITY_AD_SLOT}
            title={activity?.metaTitle || helmet.contentActivity.title}
            content={activity?.metaDescription || helmet.contentActivity.content}
            hasNavBar
        >
            {isActivityLoading ? (
                <section className={styles.activity_data_container}>
                    <PageLoading />
                </section>
            ) : activity ? (
                isEdit ? (
                    <RichTextEditor
                        activity={convertActivityType(activity, currentUser?.id || undefined)}
                    />
                ) : (
                    <ActivityArticle
                        activity={convertActivityType(activity, currentUser?.id || undefined)}
                        hasSave={isLoggedIn}
                        hasCopy
                        hasShare
                    />
                )
            ) : (
                <section className={styles.activity_data_container}>
                    <SmallLoading />
                </section>
            )}
        </PageLayout>
    );
}

export default ContentActivity;

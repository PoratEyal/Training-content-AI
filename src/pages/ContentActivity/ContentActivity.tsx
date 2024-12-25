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
import { StaticActivities, StaticSubjects } from "../../models/types/activity";

function ContentActivity() {
    const navigate = useNavigate();
    const location = useLocation();
    const { activityId, contentId } = useParams<{ activityId: string; contentId: string }>();
    const { subjects, isLoading, useFetchSubjectsData } = useStaticContentContext();
    useFetchSubjectsData();

    const contentActivityPath = `${route.content}/${activityId}/${contentId}`;

    // Extract fromPopular from location.state
    const { fromPopular } = (location.state as { fromPopular?: boolean }) || {};

    const goBack = () => {
        if (fromPopular) {
            navigate(route.popularActivities);
        } else {
            navigate(`${route.content}/${activityId}`);
        }
    };

    let subject: StaticSubjects | undefined;
    let activity: StaticActivities | undefined;

    if (subjects && subjects.length > 0) {
        subject = subjects.find((subj) => subj.name === activityId);
        if (subject && subject.activities && subject.activities.length > 0) {
            activity = subject.activities.find((act) => act.name === contentId);
        }
    }

    return (
        <PageLayout
            path={contentActivityPath}
            hasGreenBackground
            hasHeader={{ goBack }}
            hesAds={CONTENT_ACTIVITY_AD_SLOT}
            title={activity?.metaTitle || ""}
            content={activity?.metaDescription || ""}
            hasNavBar
        >
            <ActivityReady subject={activity?.title} />
            {isLoading ? (
                <section className={styles.activity_data_container}>
                    <SmallLoading />
                </section>
            ) : subject && activity ? (
                <section className={styles.activity_data_container}>
                    <article>
                        <ActivityOutputStatic activity={activity.content} />
                    </article>
                    <div className={styles.padding} />
                </section>
            ) : (
                <section className={styles.activity_data_container}>
                    <p>לא נמצאה פעולה מתאימה.</p>
                </section>
            )}
        </PageLayout>
    );
}

export default ContentActivity;

import styles from "./ContentActivity.module.css";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import ActivityReady from "../../components/titles/ActivityReady/ActivityReady";
import route from "../../router/route.json";
import { CONTENT_ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import ActivityOutput from "../../components/ActivityOutput/ActivityOutput";
import { ActivityListType } from "../../models/types/activity";
import { Activities } from "../../models/resources/activities";

function ContentActivity() {
    const navigate = useNavigate();
    const { activityId, contentId } = useParams();
    const activity = Activities[activityId].activities[contentId] as ActivityListType;

    const goBack = () => {
        navigate(`${route.content}/${activityId}`);
    };

    if (!activity) goBack();

    return (
        <PageLayout
            path={`${route.content}/${activityId}/${contentId}`}
            hasGreenBackground
            hasHeader={{ goBack }}
            hesAds={CONTENT_ACTIVITY_AD_SLOT}
            title={activity.metaTitle}
            content={activity.metaContent}
            hasNavBar
        >
            <ActivityReady subject={activity.metaTitle} />
            <section className={styles.activity_data_container}>
                <article>
                    <ActivityOutput activity={activity.content} />
                </article>
                <div className={styles.padding} />
            </section>
        </PageLayout>
    );
}

export default ContentActivity;

import styles from "./ContentActivity.module.css";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import { Activities } from "../../models/resources/activities";
import ActivityReady from "../../components/titles/ActivityReady/ActivityReady";
import ActivityMultiOutput from "../../components/ActivityMultiOutput/ActivityOutput";
import route from "../../router/route.json";
import { CONTENT_ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";

function ContentActivity() {
    const { activityId } = useParams();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(route.content);
    };

    const activity = Activities[activityId];

    if (!activity) {
        // Handle invalid activityId, e.g., redirect or show an error message
        goBack();
        return null;
    }

    return (
        <PageLayout
            path={`/content/${activityId}`}
            hasGreenBackground
            hasHeader={{ goBack }}
            hesAds={CONTENT_ACTIVITY_AD_SLOT}
            title={activity.metaTitle}
            content={activity.metaContent}
            hasNavBar
        >
            <ActivityReady subject={Activities[activityId].metaTitle} isMany />
            <section className={styles.activity_data_container}>
                <article>
                    <ActivityMultiOutput activities={Activities[activityId].Activities} />
                </article>
                <div className={styles.padding} />
            </section>
        </PageLayout>
    );
}

export default ContentActivity;

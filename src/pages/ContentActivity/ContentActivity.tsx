import styles from "./ContentActivity.module.css";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import { Activities } from "../../models/resources/activities";
import ActivityReady from "../../components/titles/ActivityReady/ActivityReady";
import ActivityMultiOutput from "../../components/ActivityMultiOutput/ActivityOutput";
import route from "../../router/route.json";

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
            hasNavBar
            title={activity.metaTitle}
            content={activity.metaContent}
        >
            <ActivityReady subject={Activities[activityId].subject} />
            <section className={styles.activity_data_container}>
                <article>
                    <ActivityMultiOutput activities={Activities[activityId].Activities} />
                </article>
            </section>
        </PageLayout>
    );
}

export default ContentActivity;

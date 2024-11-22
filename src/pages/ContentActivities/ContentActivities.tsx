import "../../components/ActivityOutput/Markdown.css";
import styles from "./ContentActivities.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReadyContent from "../../components/titles/ReadyContent/ReadyContent";
import { SubjectListType } from "../../models/types/activity";
import { Activities } from "../../models/resources/activities";

function ContentActivities() {
    const navigate = useNavigate();
    const { activityId } = useParams();
    const activities: SubjectListType = Activities[activityId];

    const goBack = () => {
        navigate(route.content);
    };

    return (
        <PageLayout
            path={route.contentActivities}
            hasHeader={{ goBack }}
            hasNavBar
            noIndex
            hasGreenBackground
            title={activities.metaTitle}
            content={activities.metaContent}
        >

            <article className={styles.content_article}>
                <section className={styles.grid_container}>
                    {Object.entries(activities.activities).map(([key, value]) => (
                        <Link
                            to={`${route.content}/${activityId}/${value.id}`}
                            className={styles.grid_item}
                            key={key}
                        >
                            <h2 className={styles.item_title}>{value.metaTitle}</h2>
                        </Link>
                    ))}
                </section>
            </article>
        </PageLayout>
    );
}

export default ContentActivities;

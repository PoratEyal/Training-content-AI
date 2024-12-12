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
import { fetchIncrementActivityDisplayCount } from "../../utils/fetch";
import { StaticSubjects } from "../../models/interface/staticSubjects";
import { StaticActivities } from "../../models/interface/StaticActivities";

const ContentActivities: React.FC = () => {
    const navigate = useNavigate();
    const { activityId } = useParams<{ activityId: string }>();
    const { subjects, isLoading } = useStaticContentContext();
    const contentActivitiesPath = route.contentActivities.replace(":activityId", activityId || "");

    const goBack = () => {
        navigate(route.content);
    };

    if (isLoading) {
        // אם עדיין טוען את הנתונים, מציגים טעינה
        return (
            <PageLayout
                path={contentActivitiesPath}
                hasHeader={{ goBack }}
                hasNavBar
                hasGreenBackground
                title=""
                content=""
                hesAds={CONTENT_ACTIVITY_AD_SLOT}
            >
                <div className={styles.content_article}>
                    <SmallLoading />
                </div>
            </PageLayout>
        );
    }

    // לאחר שהסתיימה הטעינה, ננסה למצוא את ה-subject
    let subject: StaticSubjects | undefined;
    let activities: StaticActivities[] | undefined;

    if (subjects && subjects.length > 0) {
        subject = subjects.find((subj) => subj.name === activityId);
        if (subject && subject.activities) {
            // Sort activities by orderId in ascending order
            activities = subject.activities.sort((a, b) => a.orderId - b.orderId);
        }
    }

    const handleActivityClick = async (activity: StaticActivities) => {
        try {
            await fetchIncrementActivityDisplayCount(activity);
        } catch (error) {
            console.error("Error incrementing activity display count:", error);
        }
    };

    // בדיקות לפני הצגה:
    if (!subject) {
        return (
            <PageLayout
                path={contentActivitiesPath}
                hasHeader={{ goBack }}
                hasNavBar
                hasGreenBackground
                title=""
                content=""
                hesAds={CONTENT_ACTIVITY_AD_SLOT}
            >
                <article className={styles.content_article}>
                    <p>לא נמצאו נתונים עבור הנושא המבוקש.</p>
                </article>
            </PageLayout>
        );
    }

    return (
        <PageLayout
            path={contentActivitiesPath}
            hasHeader={{ goBack }}
            hasNavBar
            hasGreenBackground
            title={subject.metaTitle || ""}
            content={subject.metaDescription || ""}
            hesAds={CONTENT_ACTIVITY_AD_SLOT}
        >
            <ReadyContentName isMany subject={subject.metaTitle} />
            <article className={styles.content_article}>
                {activities && activities.length !== 0 ? (
                    <section className={styles.grid_container}>
                        {activities.map((activity, index) => (
                            <Link
                                to={`${route.content}/${activityId}/${activity.name}`}
                                className={styles.grid_item}
                                key={index}
                                onClick={() => handleActivityClick(activity)}
                            >
                                <h2 className={styles.item_title}>{activity.metaTitle}</h2>
                            </Link>
                        ))}
                    </section>
                ) : (
                    <div>לא נמצאו פעולות מתאימות</div>
                )}
            </article>
        </PageLayout>
    );
}

export default ContentActivities;

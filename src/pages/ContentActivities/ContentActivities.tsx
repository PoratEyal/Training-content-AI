import React, { useState, useEffect } from "react";
import "../../components/ActivityOutput/Markdown.css";
import styles from "./ContentActivities.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CONTENT_ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import ReadyContentName from "../../components/titles/ReadyContentName/ReadyContentName";
import { fetchStaticSubjects } from "../../utils/staticActivitiesAPI";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";

function ContentActivities() {
    const navigate = useNavigate();
    const { activityId } = useParams();
    const [activities, setActivities] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const contentActivitiesPath = route.contentActivities.replace(':activityId', activityId);

    const goBack = () => {
        navigate(route.content);
    };

    useEffect(() => {
        const getActivities = async () => {
            try {
                const response = await fetchStaticSubjects();
    
                if (response.result === "success" && response.data) {
                    // Find the subject that matches the activityId
                    const subject = response.data.find((subject) => subject.name === activityId);
                    if (subject) {
                        // Sort activities by orderId in ascending order
                        const sortedActivities = subject.activities.sort((a, b) => a.orderId - b.orderId);
                        setActivities({ ...subject, activities: sortedActivities });
                    } else {
                        console.error("Subject not found for activityId:", activityId);
                        // Optionally set activities to an empty object or handle as needed
                        setActivities(null);
                    }
                } else {
                    console.error("Error fetching activities:", response.message);
                }
            } catch (error) {
                console.error("Error in getActivities:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        getActivities();
    }, [activityId]);
    

    return (
        <PageLayout
            path={contentActivitiesPath}
            hasHeader={{ goBack }}
            hasNavBar
            hasGreenBackground
            title={activities ? activities.metaTitle : ''}
            content={activities ? activities.metaContent : ''}
            hesAds={CONTENT_ACTIVITY_AD_SLOT}
        >
            {activities && (
                <ReadyContentName isMany subject={activities.metaTitle} />
            )}
            <article className={styles.content_article}>
                <section className={styles.grid_container}>
                    {isLoading ? (
                        <SmallLoading />
                    ) : activities && activities.activities ? (
                        activities.activities.map((activity, index) => (
                            <Link
                                to={`${route.content}/${activityId}/${activity.name}`}
                                className={styles.grid_item}
                                key={index}
                            >
                                <h2 className={styles.item_title}>{activity.metaTitle}</h2>
                            </Link>
                        ))
                    ) : null}
                </section>
            </article>
        </PageLayout>
    );
}

export default ContentActivities;

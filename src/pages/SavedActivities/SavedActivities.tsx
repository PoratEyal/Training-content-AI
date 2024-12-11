import "../../components/ActivityOutput/Markdown.css";
import styles from "./SavedActivities.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { useNavigate } from "react-router-dom";
import MyActivitiesTitle from "../../components/titles/MyActivitiesTitle/MyActivitiesTitle";
import helmet from "../../models/resources/helmet.json";
import { MY_ACTIVITIES_AD_SLOT } from "../../models/constants/adsSlot";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import { useAuthContext } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { Activity } from "../../models/types/activity";
import { TiDelete } from "react-icons/ti";
import { fetchGetSavedActivities, fetchRemoveActivity } from "../../utils/fetch";
import { useErrorContext } from "../../context/ErrorContext";
import msg from "../../models/resources/errorMsg.json";
import { RemoveActivityRequest } from "../../models/types/api/request";

const SavedActivities: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuthContext();
    const { handleError } = useErrorContext();
    const [userActivities, setUserActivities] = useState<Activity[]>([]);
    const [loadingActivities, setLoadingActivities] = useState(true);

    const goBack = () => {
        navigate(route.home); //TODO: -1 or home
    };

    const getActivities = async () => {
        if (currentUser && currentUser.id) {
            try {
                setLoadingActivities(true);
                const response = await fetchGetSavedActivities(currentUser.id);
                if (response.result === "success" && response.activities) {
                    setUserActivities(response.activities);
                }
            } catch (error) {
                handleError(msg.error.message);
            } finally {
                setLoadingActivities(false);
            }
        }
    };

    useEffect(() => {
        getActivities();
    }, [currentUser]);

    const handleDeleteActivity = async (activityToDelete: Activity) => {
        if (currentUser && currentUser.id) {
            try {
                setUserActivities((prevActivities) =>
                    prevActivities.filter((act) => act !== activityToDelete),
                );
                //TODO: add alert that the activity was removed
                await fetchRemoveActivity({
                    userId: currentUser.id,
                    activityId: activityToDelete.id,
                } as RemoveActivityRequest);
            } catch (error) {
                // handleError("לא הצלחנו למחוק את הפעולה, אנא נסו שוב."); // TODO
            }
        }
    };

    return (
        <PageLayout
            path={route.content}
            hasHeader={{ goBack }}
            hasNavBar
            hesAds={MY_ACTIVITIES_AD_SLOT}
            noIndex
            hasGreenBackground
            title={helmet.content.title}
            content={helmet.home.content}
        >
            <MyActivitiesTitle />

            <article className={styles.content_article}>
                {loadingActivities ? (
                    <section className={styles.grid_container}>
                        <SmallLoading />
                    </section>
                ) : userActivities.length === 0 ? (
                    <section className={styles.grid_container}>
                        <div>עדיין אין לך פעולות שמורות</div>
                    </section>
                ) : (
                    <section className={styles.grid_container}>
                        {userActivities.map((activity, index) => (
                            <div 
                                key={index} 
                                className={styles.grid_item}
                                onClick={(e) => {
                                    if (!(e.target as Element).closest('.delete_icon')) {
                                        navigate(`${route.myactivities}/${activity.subject}`);
                                    }
                                }}
                            >
                                <h2 className={styles.item_title}>
                                    {activity.subject}
                                </h2>
                                <TiDelete
                                    className={`${styles.delete_icon} delete_icon`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteActivity(activity);
                                    }}
                                />
                            </div>
                        ))}
                    </section>
                )}
            </article>
        </PageLayout>
    );
};

export default SavedActivities;

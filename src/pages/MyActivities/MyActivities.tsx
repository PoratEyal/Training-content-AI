import "../../components/ActivityOutput/Markdown.css";
import styles from "./MyActivities.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { useNavigate } from "react-router-dom";
import MyActivitiesTitle from "../../components/titles/MyActivitiesTitle/MyActivitiesTitle";
import helmet from "../../models/resources/helmet.json";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import { db } from "../../config/firebase";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { useAuthContext } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { Activity } from "../../models/types/activity";
import { MdDelete } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

function MyActivities() {
    const navigate = useNavigate();
    const { currentUser } = useAuthContext();
    const [userActivities, setUserActivities] = useState<Activity[]>([]);
    const [loadingActivities, setLoadingActivities] = useState(true);
    const [errorFetching, setErrorFetching] = useState<string | null>(null);

    const goBack = () => {
        navigate(route.home);
    };

    useEffect(() => {
        const fetchUserActivities = async () => {
            if (!currentUser || !currentUser.id) {
                setErrorFetching("המשתמש אינו מחובר. אנא נסו שנית");
                setLoadingActivities(false);
                return;
            }

            try {
                const userDocRef = doc(db, "users", currentUser.id);
                const userSnap = await getDoc(userDocRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    const activities = userData.activities || [];
                    setUserActivities(activities);
                } else {
                    setErrorFetching("User document does not exist.");
                }
            } catch (error: any) {
                setErrorFetching(error.message || "Failed to fetch user activities.");
            } finally {
                setLoadingActivities(false);
            }
        };

        fetchUserActivities();
    }, [currentUser]);

    const handleDeleteActivity = async (activityToDelete: Activity) => {
        if (!currentUser || !currentUser.id) return;
        try {
            const userDocRef = doc(db, "users", currentUser.id);
            await updateDoc(userDocRef, {
                activities: arrayRemove(activityToDelete)
            });
            // Update local state to remove the activity
            setUserActivities(prevActivities =>
                prevActivities.filter(act => act !== activityToDelete)
            );
        } catch (error) {
            console.error("Error deleting activity:", error);
            setErrorFetching("לא הצלחנו למחוק את הפעולה, אנא נסו שוב.");
        }
    };

    return (
        <PageLayout
            path={route.content}
            hasHeader={{ goBack }}
            hasNavBar
            hesAds={ACTIVITY_AD_SLOT}
            noIndex
            hasGreenBackground
            title={helmet.content.title}
            content={helmet.content.content}
        >
            <MyActivitiesTitle />

            <article className={styles.content_article}>
                <section className={styles.grid_container}>
                    {loadingActivities ? (
                        <SmallLoading />
                    ) : errorFetching ? (
                        <div>Error: {errorFetching}</div>
                    ) : userActivities.length === 0 ? (
                        <div>אין עדיין פעילויות שמורות</div>
                    ) : (
                        <>
                            {userActivities.map((activity, index) => (
                                <div key={index} className={styles.grid_item}>
                                    <h2
                                        className={styles.item_title}
                                        onClick={() => navigate(`${route.myActivities}/${activity.subject}`)}
                                    >
                                        {activity.subject}
                                    </h2>
                                    <TiDelete
                                        className={styles.delete_icon}
                                        onClick={() => handleDeleteActivity(activity)}
                                    >
                                    </TiDelete>
                                </div>
                            ))}
                        </>
                    )}
                </section>
            </article>
        </PageLayout>
    );
}

export default MyActivities;

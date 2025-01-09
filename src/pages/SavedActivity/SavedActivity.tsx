import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../components/ActivityOutput/Markdown.css";
import styles from "./SavedActivity.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import ActivityReady from "../../components/titles/ActivityReady/ActivityReady";
import route from "../../router/route.json";
import { MY_ACTIVITIES_AD_SLOT } from "../../models/constants/adsSlot";
import ActivityOutputStatic from "../../components/ActivityOutput/ActivityOutputStatic";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import { useAuthContext } from "../../context/AuthContext";
import { Activity } from "../../models/types/activity";
import { useSaveContext } from "../../context/SavedContext";
import MoreBtn from "../../components/ActivityMoreOptions/MoreBtn/MoreBtn";

const SavedActivity: React.FC = () => {
    const { subject } = useParams<{ subject: string }>();
    const navigate = useNavigate();
    const { currentUser } = useAuthContext();
    const {savedActivity, isLoading} = useSaveContext();
    const [activity, setActivity] = useState<Activity | null>(null);

    const goBack = () => {
        navigate(route.myactivities);
    };

    useEffect(() => {
        if(savedActivity?.length > 0 && currentUser) {
            const foundActivity = savedActivity.find(
                (act) => act.subject === subject,
            );
            if (foundActivity) {
                setActivity(foundActivity);
            }
        }
    }, [savedActivity, currentUser, subject]);

    return (
        <PageLayout
            path={`${route.myactivities}/${subject}`}
            hasGreenBackground
            hasHeader={{ goBack }}
            hesAds={MY_ACTIVITIES_AD_SLOT}
            title={activity?.subject || ""}
            content={activity?.subject || ""}
            hasNavBar
            index={false}
        >
            <ActivityReady subject={activity?.subject} />

            {isLoading ? (
                <section className={styles.activity_data_container}>
                    <SmallLoading />
                </section>
            ) : activity && activity.activity ? (
                <section className={styles.activity_data_container}>
                    <article>
                        <ActivityOutputStatic activity={activity.activity} />
                        <MoreBtn isEdit isSave activity={activity} />
                    </article>
                    <div className={styles.padding} />
                </section>
            ) : (
                <section className={styles.activity_data_container}>
                    <div>הפעולה לא נמצאה</div>
                </section>
            )}
        </PageLayout>
    );
}

export default SavedActivity;

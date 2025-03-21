import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../components/ActivityOutput/Markdown.css";
import styles from "./SavedActivity.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { MY_ACTIVITIES_AD_SLOT } from "../../models/constants/adsSlot";
import PageLoading from "../../components/Loading/PageLoading/PageLoading";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import { useAuthContext } from "../../context/AuthContext";
import { Activity } from "../../models/types/activity";
import { useSaveContext } from "../../context/SavedContext";
import { compareNormalizedStrings } from "../../utils/format";
import ActivityArticle from "../../components/ActivityArticle/ActivityArticle";

const SavedActivity: React.FC = () => {
    const { subject } = useParams<{ subject: string }>();
    const navigate = useNavigate();
    const { currentUser } = useAuthContext();
    const { savedActivity, isLoading } = useSaveContext();
    const [activity, setActivity] = useState<Activity | null>(null);

    const goBack = () => {
        navigate(route.myactivities);
    };

    useEffect(() => {
        if (savedActivity?.length > 0 && currentUser) {
            const foundActivity = savedActivity.find((act) => {
                return compareNormalizedStrings(act.subject, subject);
            });
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
            allowEdit
            index={false}
        >
            {isLoading && !activity ? (
                <section className={styles.activity_data_container_loading}>
                    <PageLoading />
                </section>
            ) : activity && activity.activity ? (
                <ActivityArticle activity={activity} hasCopy hasEdit hasShare />
            ) : (
                <section className={styles.activity_data_container}>
                    <SmallLoading />
                </section>
            )}
        </PageLayout>
    );
};

export default SavedActivity;

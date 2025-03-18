import styles from "./Activity.module.css";
import { useRef, useState, useEffect } from "react";
import { useContentContext } from "../../context/ContentContext";
import ActivityOutput from "../../components/ActivityOutput/ActivityOutput";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import helmet from "../../models/resources/helmet.json";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import ArticleOptions from "../../components/ArticleOptions/ArticleOptions";

function Activity() {
    const { data, mainActivity } = useContentContext();
    const [newActivity, setNewActivity] = useState(false);
    const activityRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(route.build);
    };

    useEffect(() => {
        if (!data || !data.grade || !data.movement || !mainActivity) {
            goBack();
        }
    }, [data, mainActivity]);

    useEffect(() => {
        if (newActivity && activityRef.current) {
            activityRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            setNewActivity(false);
        }
    }, [newActivity]);

    return (
        <>
            <PageLayout
                path={route.activity}
                hasGreenBackground
                hasHeader={{ goBack }}
                title={helmet.activity.title}
                content={helmet.home.content}
                hesAds={ACTIVITY_AD_SLOT}
                hasNavBar
                index={false}
            >
                <section className={styles.activity_data_container}>
                    <ArticleOptions activity={mainActivity} hasCopy hasEdit hasSave hasShare />
                    <article>
                        <ActivityOutput
                            title={mainActivity.subject}
                            activity={mainActivity?.activity}
                            activityRef={activityRef}
                        />
                    </article>
                    <div className={styles.padding} />
                </section>
            </PageLayout>
        </>
    );
}

export default Activity;

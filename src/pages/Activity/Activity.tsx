import styles from "./Activity.module.css";
import { useRef, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import ActivityOutput from "../../components/ActivityOutput/ActivityOutput";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import ActivityReady from "../../components/titles/ActivityReady/ActivityReady";
import helmet from "../../models/resources/helmet.json";
import GenerateBtn from "../../components/GenerateBtn/GenerateBtn";

function Activity() {
    const { data, mainActivity } = useContentContext();
    const [newActivity, setNewActivity] = useState(false);
    const activityRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!data || !data.grade || !data.movement || !mainActivity) {
            goBack();
        }
    }, [data]);

    useEffect(() => {
        if (newActivity && activityRef.current) {
            activityRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            setNewActivity(false);
        }
    }, [newActivity]);

    const goBack = () => {
        navigate(route.build);
    };

    return (
        <PageLayout
            path={route.activity}
            hasGreenBackground
            hasHeader={{ goBack }}
            title={helmet.activity.title}
            content={helmet.activity.content}
            hasNavBar
            noIndex
        >
            <ActivityReady subject={mainActivity.subject} />
            <section className={styles.activity_data_container}>
                <article>
                    <ActivityOutput activity={mainActivity.activity} activityRef={activityRef} />
                </article>
                <GenerateBtn setNewActivity={setNewActivity} activity={mainActivity} />
            </section>
        </PageLayout>
    );
}

export default Activity;

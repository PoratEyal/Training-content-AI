import styles from "./Activity.module.css";
import { useContentContext } from "../../context/ContentContext";
import ActivityOutput from "../../components/ActivityOutput/ActivityOutput";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import ActivityReady from "../../components/titles/ActivityReady/ActivityReady";

function Activity() {
    const { data, mainActivity, clearPath } = useContentContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!data || !data.grade || !data.movement || !mainActivity) {
            goBack();
        }
    }, [data]);

    const goBack = () => {
        clearPath();
        navigate(route.build);
    };

    return (
        <PageLayout path={route.activity} hasGreenBackground hasHeader={{ goBack }}>
            <ActivityReady />
            <section className={styles.activity_data_container}>
                <article>
                    <ActivityOutput activity={mainActivity} />
                </article>
            </section>
        </PageLayout>
    );
}

export default Activity;

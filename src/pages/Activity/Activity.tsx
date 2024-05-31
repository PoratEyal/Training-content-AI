import styles from "./Activity.module.css";
import { useContentContext } from "../../context/ContentContext";
import ActivityOutput from "../../components/ActivityOutput/ActivityOutput";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";

function Activity() {
    const { data, clearPath } = useContentContext();
    const navigate = useNavigate();

    useEffect(() => {
        const hasActivities = data?.movement?.path.every((p) => {
            return p.activity === undefined;
        });
        if (
            !data ||
            !data.grade ||
            !data.movement ||
            hasActivities ||
            data.movement.path.length === 0
        ) {
            goBack();
        }
    }, [data]);

    const goBack = () => {
        clearPath();
        navigate(route.choosePath);
    };

    return (
        <PageLayout path={route.activity} hasGreenBackground hasHeader={{ goBack }}>
            <h2 className={styles.activity_title}>הפעילות מוכנה!</h2>
            <section className={styles.activity_data_container}>
                <article>
                    {data?.movement?.path.map((path, i) => {
                        return path.activity ? (
                            <ActivityOutput key={i} index={i} movementPath={path} />
                        ) : null;
                    })}
                </article>
            </section>
        </PageLayout>
    );
}

export default Activity;

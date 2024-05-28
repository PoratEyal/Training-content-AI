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
        if (!data || !data.grade || !data.movement || data.movement.path.length === 0) {
            goBack();
        }
    }, []);

    const goBack = () => {
        clearPath();
        navigate(route.choosePath);
    };

    return (
        <PageLayout path={route.activity} hasGreenBackground hasHeader={{ goBack }}>
            <h2 className={styles.activity_title}>הפעילות שלכם מוכנה</h2>
            <div className={styles.activity_data_container}>
                {data?.movement?.path.map((path, i) => {
                    return path.activity ? (
                        <ActivityOutput key={i} index={i} movementPath={path} />
                    ) : null;
                })}
            </div>
        </PageLayout>
    );
}

export default Activity;

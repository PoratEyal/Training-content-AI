import styles from "./ContentOption.module.css";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import { Activities } from "../../models/resources/activities";
import ActivityReady from "../../components/titles/ActivityReady/ActivityReady";
import ActivityMultiOutput from "../../components/ActivityMultiOutput/ActivityOutput";

function ContentOption() {
    const { activityId } = useParams();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!Activities[Number(activityId)]) {
    //         goBack();
    //     }
    // }, [activityId]);

    const goBack = () => {
        navigate(-1);
    };

    return (
        <PageLayout path={`/content/${activityId}`} hasGreenBackground hasHeader={{ goBack }}>
            <ActivityReady subject={Activities[activityId].subject} />
            <section className={styles.activity_data_container}>
                <article>
                    <ActivityMultiOutput activities={Activities[activityId].Activities} />
                </article>
            </section>
        </PageLayout>
    );
}

export default ContentOption;

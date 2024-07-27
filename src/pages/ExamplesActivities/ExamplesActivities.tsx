import "../../components/ActivityOutput/Markdown.css";
import styles from "./ExamplesActivities.module.css";
import { useNavigate } from "react-router-dom";
import activity from "../../models/resources/activities.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import ReactMarkdown from "react-markdown";

function ExamplesActivities() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <PageLayout path={route.examplesActivities} hasHeader={{ goBack, isBlur: true }} hasFade>
            <article className={styles.privacy_article}>
                <section id="markdown">
                    <h1 className={styles.page_title}>פעולות לדוגמא</h1>

                    <div>
                        <ReactMarkdown>{activity.p0.text}</ReactMarkdown>
                    </div>

                    <div className={styles.space_div}>
                        <ReactMarkdown>{activity.p1.text}</ReactMarkdown>
                    </div>

                    <div className={styles.space_div}>
                        <ReactMarkdown>{activity.p2.text}</ReactMarkdown>
                    </div>
                </section>
            </article>
        </PageLayout>
    );
}

export default ExamplesActivities;

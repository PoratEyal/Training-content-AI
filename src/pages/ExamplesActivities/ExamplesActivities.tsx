import "../../components/ActivityOutput/Markdown.css";
import styles from "./ExamplesActivities.module.css";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import ReactMarkdown from "react-markdown";
import { Activities } from "../../models/resources/activities";

function ExamplesActivities() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <PageLayout path={route.examplesActivities} hasHeader={{ goBack, isBlur: true }} hasFade>
            <article className={styles.privacy_article}>
                <section id="markdown">
                    <h1 className={styles.page_title}>פעולות נפוצות</h1>
                    {Activities.map((activity, index) => (
                        <div key={index}>
                            <ReactMarkdown>{activity}</ReactMarkdown>
                            <br />
                        </div>
                    ))}
                </section>
            </article>
        </PageLayout>
    );
}

export default ExamplesActivities;

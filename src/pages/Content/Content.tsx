import "../../components/ActivityOutput/Markdown.css";
import styles from "./Content.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { Link, useNavigate } from "react-router-dom";
import { Activities } from "../../models/resources/activities";

function Content() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <PageLayout path={route.content} hasHeader={{ goBack, isBlur: true }} hasFade>
            <article className={styles.content_article}>
                <h1 className={styles.page_title}>פעולות נפוצות</h1>
                <p className={styles.description}>בחרו נושא מתוך הרשימה</p>
                <section className={styles.grid_container}>
                    {Object.entries(Activities).map(([key, value]) => (
                        <Link to={`/content/${value.id}`} key={key} className={styles.grid_item}>
                            <h2 className={styles.item_title}>{value.subject}</h2>
                        </Link>
                    ))}
                </section>
            </article>
        </PageLayout>
    );
}

export default Content;

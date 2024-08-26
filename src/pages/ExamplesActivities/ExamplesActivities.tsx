import "../../components/ActivityOutput/Markdown.css";
import styles from "./ExamplesActivities.module.css";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import ReactMarkdown from "react-markdown";
import { Activities } from "../../models/resources/activities";
import { useState } from "react";

function ExamplesActivities() {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(2); // Initial state is 2, third activity

    const goBack = () => {
        navigate(-1);
    };

    const handleSelectChange = (event) => {
        setSelectedIndex(Number(event.target.value));
    };

    return (
        <PageLayout path={route.examplesActivities} hasHeader={{ goBack, isBlur: true }} hasFade>
            <article className={styles.privacy_article}>
                <h1 className={styles.page_title}>פעולות נפוצות</h1>
                <section id="dropdown" className={styles.input_div}>
                    <select className={styles.select} onChange={handleSelectChange} value={selectedIndex}>
                        {Activities.map((activity, index) => (
                            <option key={index} value={index}>
                                {activity.title}
                            </option>
                        ))}
                    </select>
                </section>
                <section id="markdown">
                    {selectedIndex !== null && (
                        <div>
                            <ReactMarkdown>{Activities[selectedIndex].content}</ReactMarkdown>
                        </div>
                    )}
                </section>
            </article>
        </PageLayout>
    );
}

export default ExamplesActivities;

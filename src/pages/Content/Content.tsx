import "../../components/ActivityOutput/Markdown.css";
import styles from "./Content.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import ReactMarkdown from "react-markdown";
import { Activities } from "../../models/resources/activities";
import { useState } from "react";
import SelectDetails from "../../components/SelectDetails/SelectDetails";
import { SelectOption } from "../../models/types/common";
import { useNavigate } from "react-router-dom";

function Content() {
    const [selectedIndex, setSelectedIndex] = useState<string>("0");
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const options: SelectOption[] = Activities.map((activity, index) => {
        return {
            value: index.toString(),
            label: activity.subject,
        };
    });

    return (
        <PageLayout path={route.content} hasHeader={{ goBack, isBlur: true }} hasFade>
            <article className={styles.privacy_article}>
                <h1 className={styles.page_title}>פעולות נפוצות</h1>
                <section className={styles.input_div}>
                    <SelectDetails
                        data={options}
                        placeholder={"נושא הפעולה"}
                        obj={selectedIndex}
                        setObj={setSelectedIndex}
                    />
                </section>
                <section id="markdown">
                    {Activities[Number(selectedIndex)].Activities.map((activity, index) => (
                        <div key={index}>
                            <ReactMarkdown>{activity.content}</ReactMarkdown>
                            <div className={styles.content_border}></div>
                        </div>
                    ))}
                </section>
            </article>
        </PageLayout>
    );
}

export default Content;

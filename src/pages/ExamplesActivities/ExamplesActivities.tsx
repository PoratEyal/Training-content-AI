import "../../components/ActivityOutput/Markdown.css";
import styles from "./ExamplesActivities.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import ReactMarkdown from "react-markdown";
import { Activities } from "../../models/resources/activities";
import { useState } from "react";
import SelectDetails from "../../components/SelectDetails/SelectDetails";
import { SelectOption } from "../../models/types/common";

function ExamplesActivities() {
    const [selectedIndex, setSelectedIndex] = useState<string>("0");
    const hasLink = { path: route.details, text: "צרו פעולה משלכם" };

    const options: SelectOption[] = Activities.map((activity, index) => {
        return {
            value: index.toString(),
            label: activity.subject,
        };
    })

    return (
        <PageLayout path={route.examplesActivities} hasHeader={{ hasLink, isBlur: true }} hasFade>
            <article className={styles.privacy_article}>
                <h1 className={styles.page_title}>פעולות נפוצות לדוגמא</h1>
                <section className={styles.input_div}>
                    <SelectDetails
                        data={options}
                        placeholder={"נושא הפעולה"}
                        obj={selectedIndex}
                        setObj={setSelectedIndex}
                    />
                </section>
                <section id="markdown">
                    {selectedIndex !== null && (
                        <div>
                            <ReactMarkdown>{Activities[Number(selectedIndex)].content}</ReactMarkdown>
                        </div>
                    )}
                </section>
            </article>
        </PageLayout>
    );
}

export default ExamplesActivities;

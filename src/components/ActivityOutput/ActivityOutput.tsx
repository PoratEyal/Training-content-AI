import React from "react";
import styles from "./ActivityOutput.module.css";
import ReactMarkdown from "react-markdown";
import "./Markdown.css";

type ActivityOutputProps = {
    activity: string;
    activityRef?: React.MutableRefObject<HTMLElement>
};

function ActivityOutput({ activity, activityRef }: ActivityOutputProps) {
    return (
        <section className={styles.activity_output_container}>
            <section className={styles.activity_container} id="markdown" ref={activityRef}>
                <ReactMarkdown className={styles.activity_data}>{activity}</ReactMarkdown>
            </section>
            <br />
        </section>
    );
}
export default ActivityOutput;
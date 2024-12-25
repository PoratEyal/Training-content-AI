import styles from "./ActivityMultiOutput.module.css";
import ReactMarkdown from "react-markdown";
import "../ActivityOutput/Markdown.css";

type ActivityMultiOutputProps = {
    activities: any[];
};

function ActivityMultiOutput({ activities }: ActivityMultiOutputProps) {
    return (
        <section className={styles.activity_output_container}>
            <section className={styles.activity_container} id="markdown">
                {activities.map((activity, index) => (
                    <span>
                        <ReactMarkdown key={index} className={styles.activity_data}>
                            {activity.content}
                        </ReactMarkdown>
                        <br />
                        <div className={styles.border}/>
                        <br />
                    </span>
                ))}
            </section>
        </section>
    );
}
export default ActivityMultiOutput;

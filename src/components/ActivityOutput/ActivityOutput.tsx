import styles from "./ActivityOutput.module.css";
import ReactMarkdown from "react-markdown";
import MoreActions from "../MoreActions/MoreActions";
import { Activity } from "../../models/types/activity";
import "./Markdown.css";

type ActivityOutputProps = {
    activity: Activity;
};

function ActivityOutput({ activity }: ActivityOutputProps) {
    return (
        <section className={styles.activity_output_container}>
            <section className={styles.activity_contianer} id="markdown">
                <ReactMarkdown className={styles.activity_data}>{activity?.activity}</ReactMarkdown>
                <MoreActions activity={activity} />
            </section>
            <br />
        </section>
    );
}

export default ActivityOutput;

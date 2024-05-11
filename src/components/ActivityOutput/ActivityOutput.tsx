import styles from "./ActivityOutput.module.css";
import { useContentContext } from "../../context/ContentContext";
import { Activity } from "../../models/types/activity";
import ReactMarkdown from "react-markdown";
import MoreActions from "../MoreActions/MoreActions";
import "./Markdown.css";

type ActivityOutputProps = {};

function ActivityOutput({}: ActivityOutputProps) {
    const { data } = useContentContext();
    // const { name } = pathActivity;
    // const { activity } = data[pathActivity.path as keyof Activity];

    return (
        <section className={styles.activity_contianer} id="markdown">
            {/* <div className={styles.activity_title}>{name}</div> */}

            {/* <ReactMarkdown>{activity}</ReactMarkdown> */}

            <MoreActions />
        </section>
    );
}

export default ActivityOutput;

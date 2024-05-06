import styles from "./ActivityOutput.module.css";
import { useContentContext } from "../../context/ContentContext";
import { Activity, PathType } from "../../models/types/activity";
import { PathActivity } from "../../models/constants/path";
import ReactMarkdown from "react-markdown";
import MoreActions from "../MoreActions/MoreActions";
import "./Markdown.css";

type ActivityOutputProps = {
    pathActivity: PathType;
};

function ActivityOutput({ pathActivity }: ActivityOutputProps) {
    const { data } = useContentContext();
    const { name } = pathActivity;
    const { activity } = data[pathActivity.path as keyof Activity];

    return (
        <section className={styles.activity_contianer} id="markdown">
            <div className={styles.activity_title}>{name}</div>

            <ReactMarkdown>{activity}</ReactMarkdown>

            <MoreActions pathActivity={pathActivity} />
        </section>
    );
}

export default ActivityOutput;

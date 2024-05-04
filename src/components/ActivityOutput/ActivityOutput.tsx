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
        <div className={styles.activity_div} id="markdown">
            <div className={styles.h2_icon_div}>
                <h2 className={styles.h2_activity}>{name}</h2>
            </div>

            <ReactMarkdown>{activity}</ReactMarkdown>

            <MoreActions pathActivity={pathActivity} />
        </div>
    );
}

export default ActivityOutput;

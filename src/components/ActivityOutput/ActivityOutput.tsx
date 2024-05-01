import styles from "./ActivityOutput.module.css";
import { ActivityType } from "../../models/types/context";
import ReactMarkdown from "react-markdown";
import MoreActions from "../MoreActions/MoreActions";
import { PathType } from "../../models/types/path";
import "./Markdown.css";

type ActivityOutputProps = {
    pathType: PathType;
    path: ActivityType;
};

function ActivityOutput({ pathType, path }: ActivityOutputProps) {
    const { data } = path;

    return (
        <div className={styles.activity_div} id="markdown">
            <div className={styles.h2_icon_div}>
                <h2 className={styles.h2_activity}>{pathType.name}</h2>
            </div>

            <ReactMarkdown>{data}</ReactMarkdown>

            <MoreActions path={path} pathType={pathType} />
        </div>
    );
}

export default ActivityOutput;

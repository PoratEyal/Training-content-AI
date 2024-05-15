import styles from "./ActivityOutput.module.css";
import ReactMarkdown from "react-markdown";
import MoreActions from "../MoreActions/MoreActions";
import { MovementPath } from "../../models/types/movement";
import "./Markdown.css";

type ActivityOutputProps = {
    index: number,
    movementPath: MovementPath;
};

function ActivityOutput({ index, movementPath }: ActivityOutputProps) {
    const { title, activity } = movementPath;

    return (
        <section className={styles.activity_contianer} id="markdown">
            <div className={styles.activity_title}>{title}</div>
            {activity ? <ReactMarkdown>{activity?.activity}</ReactMarkdown> : null}
            <MoreActions index={index} movementPath={movementPath} />
        </section>
    );
}

export default ActivityOutput;

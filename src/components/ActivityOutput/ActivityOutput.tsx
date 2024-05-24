import styles from "./ActivityOutput.module.css";
import ReactMarkdown from "react-markdown";
import MoreActions from "../MoreActions/MoreActions";
import { MovementPath } from "../../models/types/movement";
import "./Markdown.css";

type ActivityOutputProps = {
    index: number;
    movementPath: MovementPath;
    defualtOpen?: boolean;
};

function ActivityOutput({ index, movementPath, defualtOpen = true }: ActivityOutputProps) {
    const { title, activity } = movementPath;

    return (
        <section>
            <div className={styles.activity_title}>{title}</div>
            <section className={styles.activity_contianer} id="markdown">
                {activity ? (
                    <ReactMarkdown className={styles.activity_data}>
                        {activity?.activity}
                    </ReactMarkdown>
                ) : null}
                <MoreActions index={index} movementPath={movementPath} />
            </section>
            <div className={styles.spacer}></div>
        </section>
    );
}

export default ActivityOutput;

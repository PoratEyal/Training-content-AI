import React, { useEffect, useRef, useState } from "react";
import styles from "./ActivityOutput.module.css";
import ReactMarkdown from "react-markdown";
import MoreActions from "../MoreActions/MoreActions";
import { MovementPath } from "../../models/types/movement";
import "./Markdown.css";

type ActivityOutputProps = {
    index: number;
    movementPath: MovementPath;
};

function ActivityOutput({ index, movementPath }: ActivityOutputProps) {
    const { title, activity } = movementPath;
    const [newActivity, setNewActivity] = useState(false);
    const activityRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (newActivity && activityRef.current) {
            activityRef.current.scrollIntoView({ behavior: "smooth" });
            setNewActivity(false);
        }
    }, [newActivity]);

    return (
        <section className={styles.activity_output_container} ref={activityRef}>
            <div className={styles.activity_open}>{title}</div>
            <section className={styles.activity_container} id="markdown">
                <ReactMarkdown className={styles.activity_data}>{activity?.activity}</ReactMarkdown>
                <MoreActions newActivity={newActivity} setNewActivity={setNewActivity} index={index} movementPath={movementPath} />
            </section>
            <br />
        </section>
    );
}

export default ActivityOutput;

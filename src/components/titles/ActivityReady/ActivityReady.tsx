import React from "react";
import styles from "./ActivityReady.module.css";

type ActivityReadyProps = {
    subject: string;
};

function ActivityReady({ subject }: ActivityReadyProps) {
    return (
        <h1 className={styles.activity_title}>
            <div>פעולה בנושא</div>
            {subject}
        </h1>
    );
}

export default ActivityReady;

import React from "react";
import styles from "./ActivityReady.module.css";

type ActivityReadyProps = {
    subject: string;
};

function ActivityReady({ subject }: ActivityReadyProps) {
    return <h1 className={styles.activity_title}>פעולה ל{subject}</h1>;
}

export default ActivityReady;

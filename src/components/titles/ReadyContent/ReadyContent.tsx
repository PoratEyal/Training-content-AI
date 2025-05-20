import React from "react";
import styles from "./ReadyContent.module.css";

function ReadyContent() {
    return (
        <div className={styles.tell_us_title}>
            <h1>פעולות מוכנות</h1>
            <img
                title="Yellow line image"
                alt="Yellow line image"
                src={"detailsLine.svg"}
                loading="lazy"
                width={180}
                height={5}
            ></img>
        </div>
    );
}

export default ReadyContent;

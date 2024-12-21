import React from "react";
import styles from "./ContinueWithAI.module.css";

function ContinueWithAI() {
  return (
        <h1 className={styles.logo}>
            <span className={styles.banner}>🎗</span>
            <div className={styles.word_1}>
                <div className={styles.word_1_1}>מתקדמים</div>
                <div className={styles.word_1_2}>מתקדמים</div>
            </div>
            <div className={styles.word_2}>לפעולות</div>
            <div className={styles.word_3}>
                <div className={styles.word_3_1}>ב-</div>
                <div className={styles.word_3_2}>ב-</div>
            </div>
            <div className={styles.word_4}>
                <div className={styles.word_4_1}>AI</div>
                <div className={styles.word_4_2}>AI</div>
            </div>
            <div className={styles.sparks}>
                <div className={styles.small_spark} />
                <div className={styles.big_spark} />
            </div>
        </h1>
    );
}

export default ContinueWithAI;

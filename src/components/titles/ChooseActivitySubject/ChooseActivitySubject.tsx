import React from "react";
import styles from "./ChooseActivitySubject.module.css";

function ChooseActivitySubject() {
    return (
        <div className={styles.choose_activity_subject_title}>
            <h1>
                בחרו את <br /> נושא הפעילות
            </h1>
            <img
                title="Sparks effect"
                alt="Sparks effect"
                src={"page3_effect.svg"}
                loading="lazy"
                width={23}
                height={24}
            ></img>
        </div>
    );
}

export default ChooseActivitySubject;

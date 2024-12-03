import styles from "./TopActivities.module.css";

function topActivities({ }) {
    return (
        <h1 className={styles.activity_title}>
            <div>10 הפעולות הפופולריות</div>
        </h1>
    );
}

export default topActivities;

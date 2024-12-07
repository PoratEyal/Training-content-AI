import styles from "./MyActivities.module.css";

function MyActivities() {
    return (
        <div className={styles.tell_us_title}>
            <h1>
                 הפעולות שלי
            </h1>
            <img
                title="Yellow line image"
                alt="Yellow line image"
                src={"detailsLine.svg"}
                loading="lazy"
                width={50}
                height={5}
            ></img>
        </div>
    );
}

export default MyActivities;

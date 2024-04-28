import styles from "./limitRequests.module.css";

function LimitRequest() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <label className={styles.label}>
          בשל עומס זמני על המערכת, אנו מגבילים את מספר הפעילויות שניתן לבנות
          ביום אחד.{" "}
        </label>
        <label className={styles.label}>
          אנו מתנצלים על אי הנוחות ומבטיחים לחזור בהקדם האפשרי למצב רגיל
        </label>
      </div>
    </div>
  );
}

export default LimitRequest;

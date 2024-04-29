import styles from "./limitRequests.module.css";

function LimitRequest() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <label className={styles.label}>
          אנו שמחים שאתם משתמשים במערכת לבניית הפעולות. 
        </label>
        <label className={styles.label}>
        בשלב זה אנו מגבילים את כמות הפעולות היומית על מנת ללמוד ולשפר את המערכת ולשמור על הביצועים. עם הזמן נוכל להסיר את ההגבלה ונאפשר ליצור יותר פעולות.
        </label>
        <button className={styles.submit_btn}>אישור</button>
      </div>
    </div>
  );
}

export default LimitRequest;

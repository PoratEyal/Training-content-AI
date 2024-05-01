import Modal from "../Modal/Modal";
import styles from "./LimitRequests.module.css";

function LimitRequest({ handleAccept }) {
    return (
        <Modal>
            <div className={styles.container}>
                <label className={styles.label}>
                    אנו שמחים שאתם משתמשים במערכת לבניית הפעולות.
                </label>
                <label className={styles.label}>
                    בשלב זה אנו מגבילים את כמות הפעולות היומית על מנת ללמוד ולשפר את המערכת. מחר
                    תוכלו להמשיך וליצור פעולות נוספות.
                </label>
                <label className={styles.label}>
                    עם הזמן נוכל להסיר את ההגבלה ונאפשר ליצור יותר פעולות.
                </label>
                <button onClick={handleAccept} className={styles.submit_btn}>
                    אישור
                </button>
            </div>
        </Modal>
    );
}

export default LimitRequest;

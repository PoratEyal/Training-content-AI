import styles from './loading.module.css';

function Loading() {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
            <div className={styles.loader}>
                <div className={styles.words}>
                    <span className={styles.word}></span>
                    <span className={styles.word}>טוען נתונים</span>
                    <span className={styles.word}>מחפש תוכן</span>
                    <span className={styles.word}>בודק זמנים</span>
                    <span className={styles.word}>מאמת נתונים</span>
                    <span className={styles.word}>מסכם תוצאות</span>
                    <span className={styles.word}>בודק תקינות</span>
                    <span className={styles.word}>רק עוד רגע</span>
                </div>
            </div>
        </div>
    )
}

export default Loading;

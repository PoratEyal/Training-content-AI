import styles from './Loading.module.css';

function Loading() {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
            <div className={styles.loader}>
                <div className={styles.words}>
                    <span className={styles.word}></span>
                    <span className={styles.word}>טוען נתונים</span>
                    <span className={styles.word}>מתאים לקבוצה</span>
                    <span className={styles.word}>מחפש תוכן</span>
                    <span className={styles.word}>בונה פעילות</span>
                    <span className={styles.word}>בודק זמנים</span>
                    <span className={styles.word}>מסכם תוצאות</span>
                    <span className={styles.word}>בודק תקינות</span>
                    <span className={styles.word}>רק עוד רגע..</span>
                    <span className={styles.word}>כמעט סיימנו..</span>
                </div>
            </div>
        </div>
    )
}

export default Loading;

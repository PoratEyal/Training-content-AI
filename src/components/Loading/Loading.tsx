import styles from './Loading.module.css';

function Loading() {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
            {/* <div className={styles.loader}>
                <div className={styles.words}>
                    <span className={styles.word}></span>
                    <span className={styles.word}>טעינת נתונים</span>
                    <span className={styles.word}>התאמה לקבוצה</span>
                    <span className={styles.word}>חיפוש תוכן</span>
                    <span className={styles.word}>בניית פעילות</span>
                    <span className={styles.word}>בדיקת זמנים</span>
                    <span className={styles.word}>סיכום תוצאות</span>
                    <span className={styles.word}>בדיקת תקינות</span>
                    <span className={styles.word}>רק עוד רגע..</span>
                    <span className={styles.word}>כמעט סיימנו..</span>
                </div>
            </div> */}
            <label className={styles.h2}>הפעילות בדרך</label>
            <label className={styles.text}>
                <strong>שימו לב</strong> מקור הפעולות הוא מערכת בינה מלאכותית, <br></br>ייתכן ותמצאו
                בהן אי דיוקים וטעויות. אנא בדקו את התוכן לפני כל הפעלה
            </label>
        </div>
    )
}

export default Loading;

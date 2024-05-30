import styles from './LoadingActivity.module.css';

function LoadingActivity() {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
            <label className={styles.h2}>הפעילות בדרך</label>
            <label className={styles.text}>
                שימו לב! מקור הפעילויות הינו מערכת בינה מלאכותית, ייתכן ותמצאו
                 אי דיוקים. אנא בדקו את התוכן לפני כל הפעלה
            </label>
        </div>
    )
}

export default LoadingActivity;

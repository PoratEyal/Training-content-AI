import styles from './LoadingActivity.module.css';

function LoadingActivity() {
    return (
        <div className={styles.spinnerContainer}>
            <img className={styles.gif} src="loading.gif" alt="loading gif" />
            <label className={styles.h2}>הפעילות בדרך</label>
            <label className={styles.text}>
                שימו לב! מקור הפעילויות הינו מערכת בינה מלאכותית, ייתכן ותמצאו
                 אי דיוקים. אנא בדקו את התוכן לפני כל הפעלה
            </label>
            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar}></div>
            </div>
        </div>
    )
}

export default LoadingActivity;

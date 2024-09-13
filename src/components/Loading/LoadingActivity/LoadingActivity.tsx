import styles from "./LoadingActivity.module.css";

function LoadingActivity() {
    return (
        <div className={styles.spinnerContainer}>
            <img className={styles.gif} src="loading.gif" alt="loading gif" />
            <label className={styles.h2}>הפעולה בדרך</label>
            <label className={styles.text}>
                שימו לב! מקור הפעולות הינו מערכת בינה מלאכותית, ייתכן ותמצאו אי דיוקים. אנא בדקו
                את התוכן לפני כל פעולה
            </label>
            <div className={styles.progressBar}></div>
        </div>
    );
}

export default LoadingActivity;
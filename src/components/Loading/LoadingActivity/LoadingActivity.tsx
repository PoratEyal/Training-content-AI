import AdsLoading from "../../ads/AdsLoading/AdsLoading";
import styles from "./LoadingActivity.module.css";

function LoadingActivity() {
    return (
        <section className={styles.loading_activity}>
            <div className={styles.loading_main}>
                <img className={styles.gif} src="loading.gif" alt="loading gif" />
                <label className={styles.h2}>הפעולה בדרך</label>
                <label className={styles.text}>
                    שימו לב! מקור הפעולות הינו מערכת בינה מלאכותית, ייתכן ותמצאו אי דיוקים. אנא בדקו
                    את התוכן לפני כל פעולה
                </label>
                <div className={styles.progress_bar}></div>
            </div>

            <AdsLoading />
        </section>
    );
}

export default LoadingActivity;

import { LOADING_AD_SLOT } from "../../../models/constants/adsSlot";
import AdsBig from "../../ads/AdsBig/AdsBig";
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

            <AdsBig slot={LOADING_AD_SLOT} />
        </section>
    );
}

export default LoadingActivity;

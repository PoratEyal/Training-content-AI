import styles from "./LoadingActivity.module.css";
import { useLanguage } from "../../../i18n/useLanguage";

function LoadingActivity() {
    const { t } = useLanguage();

    return (
        <section className={styles.loading_activity}>
            <div className={styles.loading_main}>
                <img className={styles.gif} src="/loading.gif" alt="loading gif" />
                <label className={styles.h2}>{t("buildActivity.loadingActivity.heading")}</label>
                <label className={styles.text}>{t("buildActivity.loadingActivity.text")}</label>
                <div className={styles.progress_bar}></div>
            </div>
        </section>
    );
}

export default LoadingActivity;

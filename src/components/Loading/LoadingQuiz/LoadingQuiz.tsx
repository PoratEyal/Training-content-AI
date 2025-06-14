import styles from "./LoadingQuiz.module.css";
import { useLanguage } from "../../../i18n/useLanguage";

function LoadingQuiz() {
    const { t } = useLanguage();

    return (
        <section className={styles.loading_quiz}>
            <div className={styles.loading_main}>
                <img className={styles.gif} src="/loading.gif" alt="loading gif" />
                <label className={styles.h2}>{t("topic.loadingHead")}</label>
                <label className={styles.text}>{t("topic.loadingText")}</label>
                <div className={styles.progress_bar}></div>
            </div>
        </section>
    );
}

export default LoadingQuiz;

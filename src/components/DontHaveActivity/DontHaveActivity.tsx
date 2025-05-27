import styles from "./DontHaveActivity.module.css";
import { useLanguage } from "../../i18n/useLanguage";

function DontHaveActivity() {
    const { t, dir } = useLanguage();

    return (
        <div className={styles.container} dir={dir}>
            <h3 className={styles.title}>{t("savedActivities.dontHaveActivity.title")}</h3>
            <div className={styles.mainText}>
                <div>{t("savedActivities.dontHaveActivity.mainTextLine1")}</div>
            </div>
            <div className={styles.iconWrapper}>
                <svg
                    className={styles.svgIcon}
                    viewBox="0 0 50 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M46 62.0085L46 3.88139L3.99609 3.88139L3.99609 62.0085L24.5 45.5L46 62.0085Z"></path>
                </svg>
            </div>
        </div>
    );
}

export default DontHaveActivity;

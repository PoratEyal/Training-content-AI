//
// This component displays the title for "My Activities" Page
//
import styles from "./MyActivities.module.css";
import { useLanguage } from "../../../i18n/useLanguage";

function MyActivitiesTitle() {
    const { isRTL, t, lang } = useLanguage();

    return (
        <div
            className={`${styles.tell_us_title} ${isRTL ? styles.rtl_title : styles.ltr_title} ${styles[lang]}`}
        >
            <h1>{t("youth.savedActivities.title")}</h1>
        </div>
    );
}

export default MyActivitiesTitle;

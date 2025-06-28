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
            <h1>{t("savedActivities.myActivities.title")}</h1>
            <img
                title="Yellow line image"
                alt="Yellow line image"
                src="/Youth/detailsLine.svg"
                loading="lazy"
                width={50}
                height={5}
            />
        </div>
    );
}

export default MyActivitiesTitle;

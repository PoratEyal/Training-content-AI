//
// This component displays the title for "My Activities" Page
//
import styles from "./MyActivities.module.css";
import { useLanguage } from "../../../i18n/useLanguage";

function MyActivitiesTitle() {
    const { isRTL, t } = useLanguage();

    return (
        <div
            className={
                isRTL ? styles.tell_us_title : `${styles.tell_us_title} ${styles.ltr_title}`
            }
        >
            <h1>{t("savedActivities.myActivities.title")}</h1>
            <img
                title="Yellow line image"
                alt="Yellow line image"
                src="/detailsLine.svg"
                loading="lazy"
                width={50}
                height={5}
            />
        </div>
    );
}

export default MyActivitiesTitle;

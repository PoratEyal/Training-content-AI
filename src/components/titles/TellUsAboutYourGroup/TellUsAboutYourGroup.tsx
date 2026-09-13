import { useLanguage } from "../../../i18n/useLanguage";
import styles from "./TellUsAboutYourGroup.module.css";

function TellUsAboutYourGroup() {
    const { dir, lang, t } = useLanguage();
    
    return (
        <div 
            className={`${styles.tell_us_title} ${dir === "rtl" ? styles.tell_us_title_rtl : styles.tell_us_title_ltr} ${styles[lang]}`}
            style={{ direction: dir }}
        >
            <h1>
                {t("youth.details.title")}
            </h1>
        </div>
    );
}

export default TellUsAboutYourGroup;

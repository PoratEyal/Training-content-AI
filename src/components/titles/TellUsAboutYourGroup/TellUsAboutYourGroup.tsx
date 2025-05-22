import { useLanguage } from "../../../i18n/useLanguage";
import styles from "./TellUsAboutYourGroup.module.css";

function TellUsAboutYourGroup() {
    const { dir, t } = useLanguage();
    
    return (
        <div 
            className={`${styles.tell_us_title} ${dir === "rtl" ? styles.tell_us_title_rtl : styles.tell_us_title_ltr}`}
            style={{ direction: dir }}
        >
            <h1>
                {t("details.title")}
            </h1>
            <img
                title={t("details.yellowLineAlt", "Yellow line image")}
                alt={t("details.yellowLineAlt", "Yellow line image")}
                src={"/detailsLine.svg"}
                loading="lazy"
                width={90}
                height={5}
            />
        </div>
    );
}

export default TellUsAboutYourGroup;

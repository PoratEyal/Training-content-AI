import styles from "./TellUsAboutYourGroup.module.css";
import { useTranslation } from "react-i18next";

function TellUsAboutYourGroup() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === "rtl";
    
    return (
        <div 
            className={`${styles.tell_us_title} ${isRTL ? styles.tell_us_title_rtl : styles.tell_us_title_ltr}`}
            style={{ direction: i18n.dir() }}
        >
            <h1>
                {t("details.title")}
            </h1>
            <img
                title={t("details.yellowLineAlt", "Yellow line image")}
                alt={t("details.yellowLineAlt", "Yellow line image")}
                src={"detailsLine.svg"}
                loading="lazy"
                width={90}
                height={5}
            />
        </div>
    );
}

export default TellUsAboutYourGroup;

import { LOADING_AD_SLOT } from "../../../models/constants/adsSlot";
import AdsBig from "../../ads/AdsBig/AdsBig";
import styles from "./LoadingActivity.module.css";
import { useTranslation } from "react-i18next";

function LoadingActivity() {
    const { t } = useTranslation();

    return (
        <section className={styles.loading_activity}>
            <div className={styles.loading_main}>
                <img className={styles.gif} src="loading.gif" alt="loading gif" />
                <label className={styles.h2}>{t("buildActivity.loadingActivity.heading")}</label>
                <label className={styles.text}>
                    {t("buildActivity.loadingActivity.text")}
                </label>
                <div className={styles.progress_bar}></div>
            </div>

            {/* <AdsBig slot={LOADING_AD_SLOT} /> */}
        </section>
    );
}

export default LoadingActivity;

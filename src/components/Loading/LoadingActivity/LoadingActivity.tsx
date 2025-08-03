import styles from "./LoadingActivity.module.css";
import { useLanguage } from "../../../i18n/useLanguage";
import { ProductType } from "../../../context/ProductType";
import { useProduct } from "../../../context/ProductContext"

function LoadingActivity() {
    const { t } = useLanguage();
    const product = useProduct()

    let heading = "";
    let text = "";

    switch (product) {
        case ProductType.Youth:
            heading = t("youthBuildActivity.loadingActivity.heading");
            text = t("youthBuildActivity.loadingActivity.text");
            break;
        case ProductType.Event:
            heading = t("eventBuildActivity.loadingActivity.heading");
            text = t("eventBuildActivity.loadingActivity.text");
            break;
        case ProductType.Practice:
            heading = t("common.loadingHead");
            text = t("common.loadingText");
            break;
        case ProductType.Words:
            heading = t("common.loadingHead");
            text = t("common.loadingText");
            break;
        default:
            heading = t("common.loadingHead");
            text = t("common.loadingText");
            break;
    }

    return (
        <section className={styles.loading_activity}>
            <div className={styles.loading_main}>
                <img className={styles.gif} src="/Common/loading.gif" alt="loading" />
                <label className={styles.h2}>{heading}</label>
                <label className={styles.text}>{text}</label>
                <div className={styles.progress_bar}></div>
            </div>
        </section>
    );
}


export default LoadingActivity;

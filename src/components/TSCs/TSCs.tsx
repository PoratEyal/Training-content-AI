import styles from "./TSCs.module.css";
import policyHe from "../../models/resources/he/policy.json";
import policyEn from "../../models/resources/en/policy.json";
import Popup from "../core/Popup/Popup";
import MainBtn from "../MainBtn/MainBtn";
import { useTranslation } from "react-i18next";

function TSCs({ handleAccept }) {
    const { t, i18n } = useTranslation();

    // Determine direction based on language (RTL for Hebrew, LTR for English)
    const isHebrew = i18n.language === "he";
    const dir = isHebrew ? "rtl" : "ltr";

    // Select policy based on language
    const currentPolicy = isHebrew ? policyHe : policyEn;

    return (
        <Popup>
            <article className={styles.privacy} dir={dir}>
                <h3 className={styles.h3_privacy}>
                    {t("privacyPolicy.title")}
                </h3>

                <div className={styles.space_div}>
                    <label>{currentPolicy.p11.text}</label>
                </div>

                <div className={styles.space_div}>
                    <label>{currentPolicy.p0.text}</label>
                </div>

                <div className={styles.space_div}>
                    <label>{currentPolicy.p1.label}</label> {currentPolicy.p1.text}
                </div>

                <div className={styles.space_div}>
                    <label>{currentPolicy.p2.label}</label> {currentPolicy.p2.text}
                </div>

                <div className={styles.space_div}>
                    <label>{currentPolicy.p3.label}</label> {currentPolicy.p3.text}
                </div>

                <div className={styles.space_div}>
                    <label>{currentPolicy.p4.label}</label> {currentPolicy.p4.text}
                </div>

                <div className={styles.space_div}>
                    <label>{currentPolicy.p5.label}</label> {currentPolicy.p5.text}
                </div>

                <div className={styles.space_div}>
                    <label>{currentPolicy.p6.label}</label> {currentPolicy.p6.text}
                </div>

                <div className={styles.space_div}>
                    <label>{currentPolicy.p7.label}</label> {currentPolicy.p7.text}
                </div>

                <div className={styles.space_div}>
                    <label>{currentPolicy.p8.label}</label> {currentPolicy.p8.text}
                </div>

                <div className={styles.space_div_end}>
                    <label>{currentPolicy.p9.label}</label> {currentPolicy.p9.text}
                </div>

                <div className={styles.fixed_btn}>
                    <MainBtn
                        type="submit"
                        isDisabled={false}
                        height={38}
                        text={t("privacyPolicy.acceptButton")}
                        func={handleAccept}
                    />
                </div>
            </article>
        </Popup>
    );
}

export default TSCs;
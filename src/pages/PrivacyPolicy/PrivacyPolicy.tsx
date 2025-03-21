import styles from "./PrivacyPolicy.module.css";
import { useNavigate } from "react-router-dom";
import policy from "../../models/resources/policy.json"; // Hebrew
import policyEn from "../../models/resources/policyEn.json"; // English
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import FadeEffect from "../../components/FadeEffect/FadeEffect";
import { useTranslation } from "react-i18next";

function PrivacyPolicy() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const goBack = () => {
        navigate(-1);
    };

    // Determine direction based on language (RTL for Hebrew, LTR for English)
    const isRtl = i18n.language === "he";
    const dir = isRtl ? "rtl" : "ltr";

    // Select policy based on language
    const currentPolicy = i18n.language === "he" ? policy : policyEn;

    return (
        <PageLayout
            id="privacyPolicy"
            path={route.privacyPolicy}
            hasHeader={{ goBack, isBlur: true }}
            index={false}
        >
            <FadeEffect hasFade>
                <article className={styles.privacy_article} dir={dir}>
                    <section>
                        <h1 className={styles.page_title}>
                            {t("privacyPolicy.title")}
                        </h1>

                        <div className={styles.space_div}>
                            <label>{currentPolicy.p0.text}</label>
                        </div>

                        <div className={styles.space_div}>
                            <label>{currentPolicy.p1.label}</label>{" "}
                            {currentPolicy.p1.text}
                        </div>

                        <div className={styles.space_div}>
                            <label>{currentPolicy.p2.label}</label>{" "}
                            {currentPolicy.p2.text}
                        </div>

                        <div className={styles.space_div}>
                            <label>{currentPolicy.p3.label}</label>{" "}
                            {currentPolicy.p3.text}
                        </div>

                        <div className={styles.space_div}>
                            <label>{currentPolicy.p4.label}</label>{" "}
                            {currentPolicy.p4.text}
                        </div>

                        <div className={styles.space_div}>
                            <label>{currentPolicy.p5.label}</label>{" "}
                            {currentPolicy.p5.text}
                        </div>

                        <div className={styles.space_div}>
                            <label>{currentPolicy.p6.label}</label>{" "}
                            {currentPolicy.p6.text}
                        </div>

                        <div className={styles.space_div}>
                            <label>{currentPolicy.p7.label}</label>{" "}
                            {currentPolicy.p7.text}
                        </div>

                        <div className={styles.space_div}>
                            <label>{currentPolicy.p8.label}</label>{" "}
                            {currentPolicy.p8.text}
                        </div>

                        <div className={styles.space_div}>
                            <label>{currentPolicy.p9.label}</label>{" "}
                            {currentPolicy.p9.text}
                        </div>
                    </section>

                    <section className={styles.email}>
                        {currentPolicy.p10.text1}{" "}
                        <a href={`mailto:${currentPolicy.p10.email}`}>
                            {currentPolicy.p10.text2}
                        </a>{" "}
                        <div>{currentPolicy.p10.text3}.</div>
                    </section>
                </article>
            </FadeEffect>
        </PageLayout>
    );
}

export default PrivacyPolicy;
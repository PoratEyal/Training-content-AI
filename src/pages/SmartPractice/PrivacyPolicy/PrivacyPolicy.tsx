//
// This is the Privacy Policy page where users can read the app's data and privacy practices.
//
import styles from "./PrivacyPolicy.module.css"
import policyHe from "../../../models/resources/he/policy.json"
import policyEn from "../../../models/resources/en/policy.json"
import policyEs from "../../../models/resources/es/policy.json"
import policyAr from "../../../models/resources/ar/policy.json"
import PageLayout from "../../../components/Layout/PageLayout/PageLayout"
import FadeEffect from "../../../components/FadeEffect/FadeEffect"
import { useLanguage } from "../../../i18n/useLanguage"
import { ProductType } from "../../../context/ProductType"

function PrivacyPolicy() {
  const { t, lang, dir } = useLanguage()

  // Determine the current policy content based on language
  const policyMap = {
    he: policyHe,
    en: policyEn,
    es: policyEs,
    ar: policyAr,
  }
  const currentPolicy = policyMap[lang] || policyEn // fallback to English if not available

  return (
    <PageLayout
      id="privacyPolicy"
      productType={ProductType.Practice}
      hasHeader={{ isBlur: true }}
      hasNavBar
      index={false}
    >
      <FadeEffect hasFade>
        <article className={styles.privacy_article} dir={dir}>
          <section>
            <h1 className={styles.page_title}>{t("privacyPolicy.title")}</h1>

            {["p0", "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9"].map(
              (key, idx) => (
                <div key={idx} className={styles.space_div}>
                  <label>{currentPolicy[key].label}</label> {currentPolicy[key].text}
                </div>
              )
            )}

            <section className={styles.email}>
              {currentPolicy.p10.text1}{" "}
              <a href={`mailto:${currentPolicy.p10.email}`}>
                {currentPolicy.p10.text2}
              </a>{" "}
              <div>{currentPolicy.p10.text3}.</div>
              <div style={{ height: "15px" }}></div>
            </section>
            <div style={{ height: "30px" }}></div>
          </section>
        </article>
      </FadeEffect>
    </PageLayout>
  )
}

export default PrivacyPolicy

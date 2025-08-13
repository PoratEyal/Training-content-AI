// Is requested by google also as a standalone page
// We also have a popup for that
import styles from "./Privacy.module.css"
import PageLayout from "../../../components/Layout/PageLayout/PageLayout"
import FadeEffect from "../../../components/FadeEffect/FadeEffect"
import { useLanguage } from "../../../i18n/useLanguage"
import { ProductType } from "../../../context/ProductType"

import policyHe from "../../../models/resources/he/policy.json"
import policyEn from "../../../models/resources/en/policy.json"
import policyEs from "../../../models/resources/es/policy.json"
import policyAr from "../../../models/resources/ar/policy.json"

import { useTranslation } from "react-i18next"

const Terms: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { dir, lang } = useLanguage()

  const policyMap: Record<string, any> = {
    he: policyHe,
    en: policyEn,
    es: policyEs,
    ar: policyAr,
  }
  const currentPolicy = policyMap[lang] || policyEn

  const title = t("privacyPolicy.title", "Terms and Conditions")

  const sectionKeys = Array.from({ length: 10 }, (_, i) => `p${i}`).filter(
    (k) => currentPolicy?.[k] && (currentPolicy[k].label || currentPolicy[k].text)
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "inLanguage": lang,
    "isPartOf": {
      "@type": "WebSite",
      "name": "ActivityWiz"
    }
  }

  return (
    <PageLayout
      id="privacyPolicy"
      productType={ProductType.Youth}
      hasHeader={{}}
      hasNavBar
      index={true}
    >
      <FadeEffect hasFade>
        <div className={styles.scrollable_wrapper}>
          <article className={styles.article} dir={dir}>
            <h1 className={styles.page_title}>{title}</h1>

            {sectionKeys.map((key) => (
              <div key={key} className={styles.section}>
                {currentPolicy[key].label && (
                  <div className={styles.section_label}>{currentPolicy[key].label}</div>
                )}
                {currentPolicy[key].text && (
                  <div className={styles.section_text}>{currentPolicy[key].text}</div>
                )}
              </div>
            ))}

            {currentPolicy?.p10 && (
              <section className={styles.email_block}>
                <span>{currentPolicy.p10.text1} </span>
                <a href={`mailto:${currentPolicy.p10.email}`}>
                  {currentPolicy.p10.text2}
                </a>
                <div>{currentPolicy.p10.text3}</div>
              </section>
            )}

            <div style={{ height: 24 }} />
          </article>
        </div>
      </FadeEffect>

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </PageLayout>
  )
}

export default Terms

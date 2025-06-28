import styles from "./PrivacyContent.module.css"
import policyHe from "../../models/resources/he/policy.json"
import policyEn from "../../models/resources/en/policy.json"
import policyEs from "../../models/resources/es/policy.json"
import policyAr from "../../models/resources/ar/policy.json"
import { useLanguage } from "../../i18n/useLanguage"

type Props = {
  onClose: () => void
}

function PopupPrivacy({ onClose }: Props) {
  const { t, lang, dir } = useLanguage()

  const policyMap = {
    he: policyHe,
    en: policyEn,
    es: policyEs,
    ar: policyAr,
  }
  const currentPolicy = policyMap[lang] || policyEn

  return (
    <div className={styles.popup_overlay}>
      <div className={styles.popup_container} dir={dir}>
        <button className={styles.close_button} onClick={onClose}>✕</button>

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
      </div>
    </div>
  )
}

export default PopupPrivacy

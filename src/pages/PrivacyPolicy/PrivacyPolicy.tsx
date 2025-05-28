import styles from "./PrivacyPolicy.module.css"
import policyHe from "../../models/resources/he/policy.json"
import policyEn from "../../models/resources/en/policy.json"
import PageLayout from "../../components/Layout/PageLayout/PageLayout"
import route from "../../router/route.json"
import FadeEffect from "../../components/FadeEffect/FadeEffect"
import { useLanguage } from "../../i18n/useLanguage"

function PrivacyPolicy() {
  const { t, isHebrew, dir } = useLanguage()

  const currentPolicy = isHebrew ? policyHe : policyEn

  return (
    <PageLayout
      id="privacyPolicy"
      path={route.privacyPolicy}
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
          </section>
        </article>
      </FadeEffect>
    </PageLayout>
  )
}

export default PrivacyPolicy

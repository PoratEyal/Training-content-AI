import styles from "./ContinueWithAI.module.css"
import { useLanguage } from "../../../i18n/useLanguage"
import { useProduct } from "../../../context/ProductContext"
import { ProductType } from "../../../context/ProductType"

function ContinueWithAI() {
  const { t, isRTL } = useLanguage()
  const product = useProduct()

  const isPractice = product === ProductType.Practice
    ? t("continueWithAI.practiceForActions")
    : t("continueWithAI.youthForActions")

  const productColorClass = product === ProductType.Practice
    ? styles.practiceColor
    : styles.youthColor

  const dirPrefix = isRTL ? "" : "_en"

  return (
    <h1 className={styles.logo}>
      <div className={styles[`word_1${dirPrefix}`]}>
        <div className={styles[`word_1_1${dirPrefix}`]}>{t("continueWithAI.advanced")}</div>
        <div className={styles[`word_1_2${dirPrefix}`]}>{t("continueWithAI.advanced")}</div>
      </div>
      <div className={`${styles[`word_2${dirPrefix}`]} ${productColorClass}`}>
        {isPractice}
      </div>
      <div className={styles[`word_3${dirPrefix}`]}>
        <div className={styles[`word_3_1${dirPrefix}`]}>{t("continueWithAI.withPrefix")}</div>
        <div className={styles[`word_3_2${dirPrefix}`]}>{t("continueWithAI.withPrefix")}</div>
      </div>
      <div className={styles[`word_4${dirPrefix}`]}>
        <div className={styles[`word_4_1${dirPrefix}`]}>{t("continueWithAI.ai")}</div>
        <div className={styles[`word_4_2${dirPrefix}`]}>{t("continueWithAI.ai")}</div>
      </div>
      <div className={styles[`sparks${dirPrefix}`]}>
        <div className={styles.small_spark} />
        <div className={styles.big_spark} />
      </div>
    </h1>
  )
}

export default ContinueWithAI

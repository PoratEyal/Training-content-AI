import styles from "./ContinueWithAI.module.css"
import { useLanguage } from "../../../i18n/useLanguage"
import { useProduct } from "../../../context/ProductContext"
import { ProductType } from "../../../context/ProductType"

function ContinueWithAI() {
  const { t, isRTL } = useLanguage()
  const product = useProduct()

  let productTitle = "";
  if (product === ProductType.Practice) {
    productTitle = t("home.practiceForActions");
  } else if (product === ProductType.Youth) {
    productTitle = t("home.youthForActions");
  } else if (product === ProductType.Words) {
    productTitle = t("home.wordsForActions");
  }

  let productColorClass = "";
  if (product === ProductType.Practice) {
    productColorClass = styles.practiceColor;
  } else if (product === ProductType.Youth) {
    productColorClass = styles.youthColor;
  } else if (product === ProductType.Words) {
    productColorClass = styles.langColor;
  }


  const dirPrefix = isRTL ? "" : "_en"

  return (
    <h1 className={styles.logo}>
      <div className={styles[`word_1${dirPrefix}`]}>
        <div className={styles[`word_1_1${dirPrefix}`]}>{t("home.advanced")}</div>
        <div className={styles[`word_1_2${dirPrefix}`]}>{t("home.advanced")}</div>
      </div>
      <div className={`${styles[`word_2${dirPrefix}`]} ${productColorClass}`}>
        {productTitle}
      </div>
      <div className={styles[`word_3${dirPrefix}`]}>
        <div className={styles[`word_3_1${dirPrefix}`]}>{t("home.withPrefix")}</div>
        <div className={styles[`word_3_2${dirPrefix}`]}>{t("home.withPrefix")}</div>
      </div>
      <div className={styles[`word_4${dirPrefix}`]}>
        <div className={styles[`word_4_1${dirPrefix}`]}>{t("home.ai")}</div>
        <div className={styles[`word_4_2${dirPrefix}`]}>{t("home.ai")}</div>
      </div>
      <div className={styles[`sparks${dirPrefix}`]}>
        <div className={styles.small_spark} />
        <div className={styles.big_spark} />
      </div>
    </h1>
  )
}

export default ContinueWithAI

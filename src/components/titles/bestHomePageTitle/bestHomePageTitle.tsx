import styles from "./bestHomePageTitle.module.css"
import { useLanguage } from "../../../i18n/useLanguage"
import { useProduct } from "../../../context/ProductContext"

function ContinueWithAI() {
  const { t, isRTL } = useLanguage()

  let productTitle = t("common.bestAppName")
  let productColorClass = styles.bestColor
  const dirPrefix = isRTL ? "" : "_en"

  return (
    <h1 className={styles.logo}>
      <div className={`${styles[`word_2${dirPrefix}`]} ${productColorClass}`}>
        {productTitle}
      </div>
      <div className={styles[`sparks${dirPrefix}`]}>
        <div className={styles[`small_spark${dirPrefix}`]} />
        <div className={styles[`big_spark${dirPrefix}`]} />
      </div>
    </h1>
  )
}

export default ContinueWithAI

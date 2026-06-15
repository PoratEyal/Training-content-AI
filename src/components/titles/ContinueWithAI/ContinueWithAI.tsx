import styles from "./ContinueWithAI.module.css"
import { useLanguage } from "../../../i18n/useLanguage"
import { useProduct } from "../../../context/ProductContext"
import { ProductType } from "../../../context/ProductType"

const productKeyMap = {
  [ProductType.Youth]: "youth",
  [ProductType.Event]: "event",
  [ProductType.Practice]: "practice",
  [ProductType.Words]: "words",
  [ProductType.Unknown]: "unknown",
} as const satisfies Record<ProductType, string>

const productColorClassMap = {
  [ProductType.Youth]: styles.youthColor,
  [ProductType.Event]: styles.eventColor,
  [ProductType.Practice]: styles.practiceColor,
  [ProductType.Words]: styles.wordsColor,
  [ProductType.Unknown]: styles.defaultColor,
} as const satisfies Record<ProductType, string>

function ContinueWithAI() {
  const { t, isRTL } = useLanguage()
  const product = useProduct()

  const pk = productKeyMap[product]
  const productColorClass = productColorClassMap[product]

  // Helper for product-scoped translations: `${product}.home.<suffix>`
  const pt = (suffix: string, defaultValue?: string) =>
    t(`${pk}.home.${suffix}`, defaultValue ? { defaultValue } : {})

  const dirPrefix = isRTL ? "" : "_ltr"

  return (
    <h1 className={styles.logo}>
      <div className={styles[`word_1${dirPrefix}`]}>
        <div className={styles[`word_1_1${dirPrefix}`]}>{pt("advanced")}</div>
        <div className={styles[`word_1_2${dirPrefix}`]}>{pt("advanced")}</div>
      </div>

      <div className={`${styles[`word_2${dirPrefix}`]} ${productColorClass}`}>
        {pt("forActions")}
      </div>

      <div className={styles[`word_3${dirPrefix}`]}>
        <div className={styles[`word_3_1${dirPrefix}`]}>{pt("withPrefix")}</div>
        <div className={styles[`word_3_2${dirPrefix}`]}>{pt("withPrefix")}</div>
      </div>

      <div className={styles[`word_4${dirPrefix}`]}>
        <div className={styles[`word_4_1${dirPrefix}`]}>{pt("ai")}</div>
        <div className={styles[`word_4_2${dirPrefix}`]}>{pt("ai")}</div>
      </div>

      <div className={styles[`sparks${dirPrefix}`]}>
        <div className={styles[`small_spark${dirPrefix}`]} />
        <div className={styles[`big_spark${dirPrefix}`]} />
      </div>
    </h1>
  )
}

export default ContinueWithAI

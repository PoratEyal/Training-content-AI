import styles from "./ContinueWithAI.module.css";
import { useLanguage } from "../../../i18n/useLanguage";
import { useLocation } from "react-router-dom"

function ContinueWithAI() {
  const { t, isRTL, lang } = useLanguage();
  const location = useLocation();

  let strForAction = "";

  if (location.pathname.includes("/practice")) {
    strForAction = t("continueWithAI.practiceForActions");
  } else {
    strForAction = t("continueWithAI.forActions");
  }


  if (isRTL) {
    return (
      <h1 className={styles.logo}>
        <div className={styles.word_1}>
          <div className={styles.word_1_1}>{t("continueWithAI.advanced")}</div>
          <div className={styles.word_1_2}>{t("continueWithAI.advanced")}</div>
        </div>
        <div className={styles.word_2}>{strForAction}</div>
        <div className={styles.word_3}>
          <div className={styles.word_3_1}>{t("continueWithAI.withPrefix")}</div>
          <div className={styles.word_3_2}>{t("continueWithAI.withPrefix")}</div>
        </div>
        <div className={styles.word_4}>
          <div className={styles.word_4_1}>{t("continueWithAI.ai")}</div>
          <div className={styles.word_4_2}>{t("continueWithAI.ai")}</div>
        </div>
        <div className={styles.sparks}>
          <div className={styles.small_spark} />
          <div className={styles.big_spark} />
        </div>
      </h1>
    )
  } else {
    return (
      <h1 className={styles.logo}>
        <div className={styles.word_1_en}>
          <div className={styles.word_1_1_en}>{t("continueWithAI.advanced")}</div>
          <div className={styles.word_1_2_en}>{t("continueWithAI.advanced")}</div>
        </div>
        <div className={styles.word_2_en}>{strForAction}</div>
        <div className={styles.word_3_en}>
          <div className={styles.word_3_1_en}>{t("continueWithAI.withPrefix")}</div>
          <div className={styles.word_3_2_en}>{t("continueWithAI.withPrefix")}</div>
        </div>
        <div className={styles.word_4_en}>
          <div className={styles.word_4_1_en}>{t("continueWithAI.ai")}</div>
          <div className={styles.word_4_2_en}>{t("continueWithAI.ai")}</div>
        </div>
        <div className={styles.sparks_en}>
          <div className={styles.small_spark} />
          <div className={styles.big_spark} />
        </div>
      </h1>
    )
  }
}

export default ContinueWithAI;

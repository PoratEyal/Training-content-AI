// src/components/ContinueWithAI/ContinueWithAI.tsx

import { useTranslation } from "react-i18next";
import styles from "./ContinueWithAI.module.css";

function ContinueWithAI() {
  const { t } = useTranslation();

  return (
    <h1 className={styles.logo}>
      <span className={styles.banner}>🎗</span>
      <div className={styles.word_1}>
        <div className={styles.word_1_1}>{t("continueWithAI.advanced1")}</div>
        <div className={styles.word_1_2}>{t("continueWithAI.advanced2")}</div>
      </div>
      <div className={styles.word_2}>{t("continueWithAI.forActions")}</div>
      <div className={styles.word_3}>
        <div className={styles.word_3_1}>{t("continueWithAI.withPrefix1")}</div>
        <div className={styles.word_3_2}>{t("continueWithAI.withPrefix2")}</div>
      </div>
      <div className={styles.word_4}>
        <div className={styles.word_4_1}>{t("continueWithAI.ai1")}</div>
        <div className={styles.word_4_2}>{t("continueWithAI.ai2")}</div>
      </div>
      <div className={styles.sparks}>
        <div className={styles.small_spark} />
        <div className={styles.big_spark} />
      </div>
    </h1>
  );
}

export default ContinueWithAI;

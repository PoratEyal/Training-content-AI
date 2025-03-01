import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./CreateYourActivity.module.css";

function CreateYourActivity() {
  const { t, i18n } = useTranslation(); // uses the default namespace "translation"
  const isEnglish = i18n.language === "en";

  return (
    <div
      className={
        isEnglish
          ? `${styles.create_your_activity_title} ${styles.ltr}`
          : styles.create_your_activity_title
      }
    >
      {/* Pulls the text from createYourActivity.title */}
      <h1>{t("buildActivity.createTitle")}</h1>

      <img
        title="Sparks effect"
        alt="Sparks effect"
        src="page3_effect.svg"
        loading="lazy"
        width={23}
        height={24}
      />
    </div>
  );
}

export default CreateYourActivity;

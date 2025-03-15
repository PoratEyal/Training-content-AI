import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./ReadyContent.module.css";

function ReadyContent() {
  const { t, i18n } = useTranslation();
  // If language is Hebrew, use default. Otherwise, add an override class.
  const isHebrew = i18n.language === "he";

  return (
    <div
      className={
        isHebrew
          ? styles.tell_us_title
          : `${styles.tell_us_title} ${styles.ltr_title}`
      }
    >
      <h1>{t("contentPage.readyContentTitle")}</h1>
      <img
        title="Yellow line image"
        alt="Yellow line image"
        src="detailsLine.svg"
        loading="lazy"
        width={180}
        height={5}
      />
    </div>
  );
}

export default ReadyContent;

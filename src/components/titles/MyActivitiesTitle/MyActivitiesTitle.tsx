import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./MyActivities.module.css";

function MyActivities() {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === "he"; // or i18n.dir() === "rtl"

  return (
    <div
      className={
        isHebrew
          ? styles.tell_us_title
          : `${styles.tell_us_title} ${styles.ltr_title}`
      }
    >
      <h1>{t("savedActivities.myActivities.title")}</h1>
      <img
        title="Yellow line image"
        alt="Yellow line image"
        src="detailsLine.svg"
        loading="lazy"
        width={50}
        height={5}
      />
    </div>
  );
}

export default MyActivities;

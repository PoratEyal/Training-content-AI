import React from "react";
import "../../components/ActivityOutput/Markdown.css";
import styles from "./Content.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { Link, useNavigate } from "react-router-dom";
import ReadyContent from "../../components/titles/ReadyContent/ReadyContent";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import PageLoading from "../../components/Loading/PageLoading/PageLoading";
import { useStaticContentContext } from "../../context/StaticContentContext";
import { Icons } from "../../components/Icons";
import { useTranslation } from "react-i18next";

function Content() {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === "he"; // Check if current language is Hebrew

  const { subjects, isLoading, useFetchSubjectsData } = useStaticContentContext();
  const navigate = useNavigate();
  useFetchSubjectsData();
    
  const goBack = () => {
    navigate(route.home);
  };

  return (
    <PageLayout
      id="content"
      path={route.content}
      hasHeader={{ goBack }}
      hasNavBar
      hesAds={ACTIVITY_AD_SLOT}
      index={true}
      hasGreenBackground
    >
      <ReadyContent />

      <article className={styles.content_article}>
        {isLoading ? (
          <section className={styles.grid_container}>
            <PageLoading />
          </section>
        ) : subjects && subjects.length > 0 ? (
          <section className={styles.grid_container}>
            {/* Popular Activities */}
            <Link
              to={route.popularActivities}
              className={
                isHebrew
                  ? `${styles.grid_item} ${styles.rtl_item}`
                  : `${styles.grid_item} ${styles.ltr_item}`
              }
            >
              <h2 className={styles.item_title}>
                {t("contentPage.popularActivities")}
              </h2>
              <div className={styles.icon}>
                {Icons["GiPodium"] &&
                  React.createElement(Icons["GiPodium"], {
                    className: styles.icon,
                  })}
              </div>
            </Link>

            {/* List of subjects */}
            {subjects.map((subject, index) => (
              <Link
                to={`${route.content}/${subject.name}`}
                key={index}
                className={
                  isHebrew
                    ? `${styles.grid_item} ${styles.rtl_item}`
                    : `${styles.grid_item} ${styles.ltr_item}`
                }
              >
                <h2 className={styles.item_title}>
                  {subject?.metaTitle}
                </h2>
                <div className={styles.icon}>
                  {Icons[subject.icon] &&
                    React.createElement(Icons[subject.icon], {
                      className: styles.icon,
                    })}
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <div>{t("contentPage.noSubjectSelected")}</div>
        )}
      </article>
    </PageLayout>
  );
}

export default Content;

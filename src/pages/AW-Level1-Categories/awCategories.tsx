//
// This page shows a list of pre-written content subjects (topics) with icons and titles
// It fetches the data from StaticContentContext and displays it as links
// It includes a link to the 10 most popular activities and a back button to homePage
//
import styles from "./awCategories.module.css";
import React, { useMemo } from "react";
import "../../components/ActivityOutput/Markdown.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { Link, useNavigate } from "react-router-dom";
import ReadyContent from "../../components/titles/ReadyContent/ReadyContent";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import PageLoading from "../../components/Loading/PageLoading/PageLoading";
import { useStaticContentContext } from "../../context/StaticContentContext";
import { Icons } from "../../components/Icons";
import { buildContentSchema } from "../../models/schemaOrg";
import { useLanguage } from "../../i18n/useLanguage";

function Content() {
  const { lang } = useLanguage();
  const { subjects, isLoading, useFetchSubjectsData } = useStaticContentContext();
  const navigate = useNavigate();
  useFetchSubjectsData();

  // Determine language-specific paths (fallback to Hebrew)
  const AW_ActivitiesL1Path = route[`AW_ActivitiesL1${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.AW_ActivitiesL1He;
  const AW_ActivitiesPopularPath = route[`AW_ActivitiesPopulars${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.AW_ActivitiesPopularsHe;
  const homePagePath = route[`homePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.homePageHe;

  const contentSchema = useMemo(
    () => buildContentSchema(subjects || [], AW_ActivitiesL1Path),
    [subjects, AW_ActivitiesL1Path]
  );

  const goBack = () => {
    navigate(homePagePath);
  };

  return (
    <PageLayout
      id="content"
      path={AW_ActivitiesL1Path}
      hasHeader={{ goBack }}
      hasNavBar
      hasAds={ACTIVITY_AD_SLOT}
      index={true}
      hasGreenBackground
    >
      <script type="application/ld+json">{JSON.stringify(contentSchema)}</script>

      <ReadyContent />

      <article className={styles.content_article}>
        {isLoading ? (
          <section className={styles.grid_container}>
            <PageLoading />
          </section>
        ) : subjects && subjects.length > 0 ? (
          <section className={styles.grid_container}>
            <Link to={AW_ActivitiesPopularPath} className={styles.grid_item}>
              <h2 className={styles.item_title}>10 הפעולות הפופולריות</h2>
              <div className={styles.icon}>
                {Icons["GiPodium"] &&
                  React.createElement(Icons["GiPodium"], { className: styles.icon })}
              </div>
            </Link>
            {subjects.map((subject, index) => (
              <Link
                to={`${AW_ActivitiesL1Path}/${subject.name}`}
                key={index}
                className={styles.grid_item}
              >
                <h2 className={styles.item_title}>{subject.metaTitle}</h2>
                <div className={styles.icon}>
                  {Icons[subject.icon] &&
                    React.createElement(Icons[subject.icon], { className: styles.icon })}
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <div>לא נבחר נושא פעולה</div>
        )}
      </article>
    </PageLayout>
  );
}

export default Content;

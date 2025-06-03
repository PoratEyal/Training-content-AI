//
// Level 1: categories static Content 
// This page shows a list of pre-written content topics with icons and titles
// It fetches the data from StaticContentContext and displays it as links
// It includes a link to the 10 most popular activities and a back button to homePage
//
import styles from "./Content.module.css";
import React, { useMemo } from "react";
import "../../components/ActivityOutput/Markdown.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { Link, useNavigate } from "react-router-dom";
import ReadyContent from "../../components/Titles/ReadyContent/ReadyContent";
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
  const TopicsPath = route[`Content${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.ContentHe;
  const PopularPath = route[`ActivitiesPopular${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.ActivitiesPopularHe;
  const homePagePath = route[`homePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.homePageHe;

  const contentSchema = useMemo(
    () => buildContentSchema(subjects || [], TopicsPath),
    [subjects, TopicsPath]
  );

  const goBack = () => {
    navigate(homePagePath);
  };

  return (
    <PageLayout
      id="content"
      path={TopicsPath}
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
            <Link to={PopularPath} className={styles.grid_item}>
              <h2 className={styles.item_title}>10 הפעולות הפופולריות</h2>
              <div className={styles.icon}>
                {Icons["GiPodium"] &&
                  React.createElement(Icons["GiPodium"], { className: styles.icon })}
              </div>
            </Link>
            {subjects.map((subject, index) => (
              <Link
                to={`${TopicsPath}/${subject.name}`}
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

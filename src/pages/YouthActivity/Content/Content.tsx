//
// Level 1: categories static Content 
// This page shows a list of pre-written content topics with icons and titles
// It fetches the data from StaticContentContext and displays it as links
// It includes a link to the 10 most popular activities and a back button to homePage
//
import React, { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../components/ActivityOutput/Markdown.css";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import PageLoading from "../../../components/Loading/PageLoading/PageLoading";
import ReadyContent from "../../../components/titles/ReadyContent/ReadyContent";
import { Icons } from "../../../components/Icons";
import { useStaticContentContext } from "../../../context/StaticContentContext";
import { useContentContext } from "../../../context/ContentContext";
import { useLanguage } from "../../../i18n/useLanguage";
import { ProductType } from "../../../context/ProductType";
import { YOUTH_CONTENT_ACTIVITY_AD_SLOT } from "../../../models/constants/adsSlot";
import { buildContentSchema } from "../../../models/schemaOrg";
import route from "../../../router/route.json";
import { ProductPages } from "../../../models/enum/pages";
import styles from "./Content.module.css";
import { StorageKey } from "../../../models/enum/storage";


function Content() {

  const { lang } = useLanguage();
  const { subjects, isLoading, useFetchSubjectsData } = useStaticContentContext();
  const navigate = useNavigate();
  const { setCurrentPage } = useContentContext()
  useFetchSubjectsData();

  const youthContentPath = route[`youthContent${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthContentEn;
  const youthPopularContentPath = route[`youthActivitiesPopular${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthActivitiesPopularEn;
  const youthHomePagePath = route[`youthHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthHomePageEn;

  const goBack = () => { navigate(youthHomePagePath); };

  useEffect(() => {
    setCurrentPage(ProductPages.PAGE_YouthStaticContent);
    sessionStorage.setItem(StorageKey.LAST_PAGE, ProductPages.PAGE_YouthStaticContent);
  }, []);

  const contentSchema = useMemo(
    () => buildContentSchema(subjects || [], youthContentPath),
    [subjects, youthContentPath]
  );

  return (
    <PageLayout
      id="content"
      productType={ProductType.Youth}
      hasHeader={{ goBack }}
      hasNavBar
      hasAds={YOUTH_CONTENT_ACTIVITY_AD_SLOT}
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
            <Link to={youthPopularContentPath} className={styles.grid_item}>
              <h2 className={styles.item_title}>10 הפעולות הפופולריות</h2>
              <div className={styles.icon}>
                {Icons["GiPodium"] &&
                  React.createElement(Icons["GiPodium"], { className: styles.icon })}
              </div>
            </Link>
            {subjects.map((subject, index) => (
              <Link
                to={`${youthContentPath}/${subject.name}`}
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

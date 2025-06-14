//
// Level 2: This is the Static Content Activities page
// It displays a list of static activities under a selected Category
//

import styles from "./ContentActivities.module.css";
import React from "react";
import "../../../components/ActivityOutput/Markdown.css";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import route from "../../../router/route.json";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CONTENT_ACTIVITY_AD_SLOT } from "../../../models/constants/adsSlot";
import PageLoading from "../../../components/Loading/PageLoading/PageLoading";
import { useStaticContentContext } from "../../../context/StaticContentContext";
import { fetchIncrementActivityDisplayCount } from "../../../utils/fetch";
import { StaticActivities } from "../../../models/types/activity";
import { helmetJson } from "../../../models/resources/helmet";
import { useLanguage } from "../../../i18n/useLanguage";
import ReadyContentName from "../../../components/titles/ReadyContentName/ReadyContentName";

const ContentActivities: React.FC = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { activityId } = useParams<{ activityId: string }>();
  const { subjects, isLoading, useFetchSubjectsData } = useStaticContentContext();

  useFetchSubjectsData();

  const contentActivitiesPath = route[`Activities${lang.charAt(0).toUpperCase() + lang.slice(1)}`]
    ? route[`Activities${lang.charAt(0).toUpperCase() + lang.slice(1)}`].replace(":activityId", activityId || "")
    : `${route.ActivitiesHe}/${activityId}`;

  const goBack = () => {
    const topicsPath = route[`Content${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.ContentHe;
    navigate(topicsPath);
  };

  // Find the subject and sort activities by order
  const { subject, activities } = React.useMemo(() => {
    if (!subjects?.length) return { subject: undefined, activities: undefined };
    const foundSubject = subjects.find((subj) => subj.name === activityId);
    const sortedActivities = foundSubject?.activities?.sort((a, b) => a.orderId - b.orderId);
    return { subject: foundSubject, activities: sortedActivities };
  }, [subjects, activityId]);

  // Increment activity display count
  const handleActivityClick = async (activity: StaticActivities) => {
    try {
      await fetchIncrementActivityDisplayCount(activity);
    } catch (error) {
      console.error("Error incrementing activity display count:", error);
    }
  };

  return (
    <PageLayout
      id="contentActivities"
      path={contentActivitiesPath}
      hasHeader={{ goBack }}
      hasNavBar
      hasGreenBackground
      hasAds={CONTENT_ACTIVITY_AD_SLOT}
    >
      <div
        style={{
          marginTop: "-60px",
          marginRight: "auto",
          marginLeft: "auto",
          width: "230px",
        }}
      >
        <ReadyContentName
          type="many"
          subject={subject?.metaTitle || helmetJson[lang].contentActivities.title}
          isLoading={isLoading}
        />
      </div>

      {isLoading ? (
        <section className={styles.content_article}>
          <PageLoading />
        </section>
      ) : subject ? (
        <article className={styles.content_article}>
          {activities && activities.length !== 0 ? (
            <section className={styles.grid_container}>
              {activities.map((activity, index) => (
                <Link
                  to={`/${lang}/content/${activityId}/${activity.name}`}
                  className={styles.grid_item}
                  key={index}
                  onClick={() => handleActivityClick(activity)}
                >
                  <h2 className={styles.item_title}>{activity.title}</h2>
                </Link>
              ))}
            </section>
          ) : (
            <div>לא נמצאו פעולות מתאימות</div>
          )}
        </article>
      ) : (
        <article className={styles.content_article}>
          <p>לא נמצאו נתונים עבור הנושא המבוקש.</p>
        </article>
      )}
    </PageLayout>
  );
};

export default ContentActivities;

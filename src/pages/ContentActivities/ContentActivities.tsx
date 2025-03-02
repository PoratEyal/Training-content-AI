import React from "react";
import "../../components/ActivityOutput/Markdown.css";
import styles from "./ContentActivities.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CONTENT_ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import ReadyContentName from "../../components/titles/ReadyContentName/ReadyContentName";
import PageLoading from "../../components/Loading/PageLoading/PageLoading";
import { useStaticContentContext } from "../../context/StaticContentContext";
import { fetchIncrementActivityDisplayCount } from "../../utils/fetch";
import { StaticActivities } from "../../models/types/activity";
import helmet from "../../models/resources/helmet.json";

// 1) import the translation hook
import { useTranslation } from "react-i18next";

const ContentActivities: React.FC = () => {
  const navigate = useNavigate();
  const { activityId } = useParams<{ activityId: string }>();
  const { subjects, isLoading, useFetchSubjectsData } = useStaticContentContext();
  useFetchSubjectsData();

  const contentActivitiesPath = route.contentActivities.replace(
    ":activityId",
    activityId || ""
  );

  // 2) Destructure the translator
  const { t } = useTranslation();

  const goBack = () => {
    navigate(route.content);
  };

  const { subject, activities } = React.useMemo(() => {
    if (!subjects?.length) return { subject: undefined, activities: undefined };

    const foundSubject = subjects.find((subj) => subj.name === activityId);
    const sortedActivities = foundSubject?.activities?.sort(
      (a, b) => a.orderId - b.orderId
    );

    return { subject: foundSubject, activities: sortedActivities };
  }, [subjects, activityId]);

  const handleActivityClick = async (activity: StaticActivities) => {
    try {
      await fetchIncrementActivityDisplayCount(activity);
    } catch (error) {
      console.error("Error incrementing activity display count:", error);
    }
  };

  return (
    <PageLayout
      path={contentActivitiesPath}
      hasHeader={{ goBack }}
      hasNavBar
      hasGreenBackground
      title={subject?.metaTitle || helmet.contentActivities.title}
      content={subject?.metaDescription || helmet.contentActivities.content}
      hesAds={CONTENT_ACTIVITY_AD_SLOT}
    >
      <ReadyContentName
        isMany
        subject={subject?.metaTitle || helmet.contentActivities.title}
        isLoading={isLoading}
      />

      {isLoading ? (
        <section className={styles.content_article}>
          <PageLoading />
        </section>
      ) : subject ? (
        <article className={styles.content_article}>
          {activities && activities.length !== 0 ? (
            <section className={styles.grid_container}>
              {activities.map((activity, index) => {
                return (
                  <Link
                    to={`${route.content}/${activityId}/${activity.name}`}
                    className={styles.grid_item}
                    key={index}
                    onClick={() => handleActivityClick(activity)}
                  >
                    <h2 className={styles.item_title}>{activity.title}</h2>
                  </Link>
                );
              })}
            </section>
          ) : (
            <div>{t("contentActivities.noSuitableActivities")}</div>
          )}
        </article>
      ) : (
        <article className={styles.content_article}>
          <p>{t("contentActivities.noSubjectData")}</p>
        </article>
      )}
    </PageLayout>
  );
};

export default ContentActivities;

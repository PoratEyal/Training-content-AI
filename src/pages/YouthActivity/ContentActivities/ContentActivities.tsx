//
// Level 2: This is the Static Content Activities page
// It displays a list of static activities under a selected Category
//
import "../../../components/ActivityOutput/Markdown.css";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CONTENT_ACTIVITY_AD_SLOT } from "../../../models/constants/adsSlot";
import { StaticActivities } from "../../../models/types/activity";
import { fetchIncrementActivityDisplayCount } from "../../../utils/fetch";
import { useStaticContentContext } from "../../../context/StaticContentContext";
import { useLanguage } from "../../../i18n/useLanguage";
import { useTranslation } from "react-i18next";
import { ProductType } from "../../../context/ProductType";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import PageLoading from "../../../components/Loading/PageLoading/PageLoading";
import route from "../../../router/route.json";
import styles from "./ContentActivities.module.css";


const ContentActivities: React.FC = () => {

  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { activityId } = useParams<{ activityId: string }>();
  const { subjects, isLoading, useFetchSubjectsData } = useStaticContentContext();
  const { t } = useTranslation();

  useFetchSubjectsData();

  const langKey = lang.charAt(0).toUpperCase() + lang.slice(1);

  const goBack = () => {
    const youthContentPath = route[`youthContent${langKey}`] || route.youthContentEn;
    navigate(youthContentPath);
  };

  // Find the subject and sort activities by order
  const { subject, activities } = React.useMemo(() => {
    if (!subjects?.length) return { subject: undefined, activities: undefined };
    const foundSubject = subjects.find((subj) => subj.name === activityId);
    const sortedActivities = foundSubject?.activities?.sort((a, b) => a.orderId - b.orderId);
    return { subject: foundSubject, activities: sortedActivities };
  }, [subjects, activityId]);

  // Redirect to HomePage if subject not found
  React.useEffect(() => {
    const youthHomePagePath = route[`youthHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthHomePageEn;
    if (!isLoading && activityId && !subject) {
      navigate(youthHomePagePath);
    }
  }, [isLoading, subject, activityId, lang, navigate]);


  // Increment activity display count
  const incrementActivityDisplayCount = async (activity: StaticActivities) => {
    try {
      await fetchIncrementActivityDisplayCount(activity);
    } catch (error) {
      console.error("Error incrementing activity display count:", error);
    }
  };

  const title = subject?.metaTitle || t("contentActivities.loading");

  return (
    <PageLayout
      id="contentActivities"
      productType={ProductType.Youth}
      hasHeader={{ goBack, hasTitle: title }}
      hasNavBar
      hasGreenBackground
      hasAds={CONTENT_ACTIVITY_AD_SLOT}
    >
      {isLoading ? (
        <section className={styles.content_article}>
          <PageLoading />
        </section>
      ) : (
        <article className={styles.content_article}>
          {activities && activities.length !== 0 ? (
            <section className={styles.grid_container}>
              {activities.map((activity, index) => {
                const activityPath =
                  route[`youthActivityContent${langKey}`]
                    ?.replace(":activityId", activityId || "")
                    ?.replace(":contentId", activity.name) || "#";

                return (
                  <Link
                    to={activityPath}
                    className={styles.grid_item}
                    key={index}
                    onClick={() => incrementActivityDisplayCount(activity)}
                  >
                    <h2 className={styles.item_title}>{activity.title}</h2>
                  </Link>
                );
              })}
            </section>
          ) : (
            <div>לא נמצאו פעולות מתאימות</div>
          )}
        </article>
      )}
    </PageLayout>
  );
};

export default ContentActivities;

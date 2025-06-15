//
// This is the Predefined Popular Activities page
// It displays the top 10 most viewed static activities across all subjects
//
import styles from "../ContentActivities/ContentActivities.module.css";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import route from "../../../router/route.json";
import { Link, useNavigate } from "react-router-dom";
import { useStaticContentContext } from "../../../context/StaticContentContext";
import { CONTENT_ACTIVITY_AD_SLOT } from "../../../models/constants/adsSlot";
import { fetchIncrementActivityDisplayCount } from "../../../utils/fetch";
import { StaticActivities } from "../../../models/types/activity";
import PageLoading from "../../../components/Loading/PageLoading/PageLoading";
import { useLanguage } from "../../../i18n/useLanguage";
import TopActivities from "../../../components/titles/TopActivities/TopActivities";

function PopularActivities() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { subjects, isLoading, useFetchSubjectsData } = useStaticContentContext();
  useFetchSubjectsData();

  // Determine language-specific paths
  const youthContentPath = route[`youthContent${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthContentEn;

  const goBack = () => {
    navigate(youthContentPath);
  };

  let topActivities: { activity: StaticActivities; subjectName: string }[] = [];

  if (!isLoading && subjects) {
    const allActivities: { activity: StaticActivities; subjectName: string }[] = [];

    subjects.forEach((subject) => {
      subject.activities?.forEach((activity) => {
        allActivities.push({
          activity: activity,
          subjectName: subject.name,
        });
      });
    });

    topActivities = allActivities
      .sort((a, b) => b.activity.displayCount - a.activity.displayCount)
      .slice(0, 10);
  }

  const handleActivityClick = async (activity: StaticActivities) => {
    try {
      await fetchIncrementActivityDisplayCount(activity);
    } catch (error) {
      console.error("Error incrementing activity display count:", error);
    }
  };

  return (
    <PageLayout
      id="popularActivities"
      projectType={"youth"}
      hasHeader={{ goBack }}
      hasNavBar
      hasGreenBackground
      hasAds={CONTENT_ACTIVITY_AD_SLOT}
    >
      <TopActivities />
      {isLoading ? (
        <section className={styles.content_article}>
          <PageLoading />
        </section>
      ) : (
        <article className={styles.content_article}>
          <section className={styles.grid_container}>
            {topActivities.length > 0 ? (
              topActivities.map((item, index) => (
                <Link
                  to={`${youthContentPath}/${item.subjectName}/${item.activity.name}`}
                  className={styles.grid_item}
                  key={index}
                  onClick={() => handleActivityClick(item.activity)}
                  state={{ fromPopular: true }}
                >
                  <h2 className={styles.item_title}>{item.activity.title}</h2>
                </Link>
              ))
            ) : (
              <div>אין כרגע פעולות זמינות ברשימה</div>
            )}
          </section>
        </article>
      )}
    </PageLayout>
  );
}

export default PopularActivities;

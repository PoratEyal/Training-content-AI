//
// This is the Predefined Popular Activities page
// It displays the top 10 most viewed static activities across all subjects
//
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../../../i18n/useLanguage";
import { useStaticContentContext } from "../../../context/StaticContentContext";
import { ProductType } from "../../../context/ProductType";
import route from "../../../router/route.json";
import { YOUTH_CONTENT_ACTIVITY_AD_SLOT } from "../../../models/constants/adsSlot";
import { StaticActivities } from "../../../models/types/activity";
import { fetchIncrementActivityDisplayCount } from "../../../utils/fetch";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import PageLoading from "../../../components/Loading/PageLoading/PageLoading";
import styles from "../ContentActivities/ContentActivities.module.css";


function PopularActivities() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { subjects, isLoading, useFetchSubjectsData } = useStaticContentContext();
  useFetchSubjectsData();

  // Determine language-specific paths
  const youthContentPath = route[`youthContent${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthContentEn;

  const goBack = () => { navigate(youthContentPath); };

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
      productType={ProductType.Youth}
      hasHeader={{ goBack, hasTitle: "10 הפעולות הפופולריות" }}
      hasNavBar
      hasGreenBackground
      hasAds={YOUTH_CONTENT_ACTIVITY_AD_SLOT}
    >
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

import styles from "../../pages/ContentActivities/ContentActivities.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { Link, useNavigate } from "react-router-dom";
import { useStaticContentContext } from "../../context/StaticContentContext";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import TopActivities from "../titles/TopActivities/TopActivities";
import { fetchIncrementActivityDisplayCount } from "../../utils/fetch";
import { StaticActivities } from "../../models/interface/StaticActivities";

function PopularActivities() {
    const navigate = useNavigate();
    const { subjects, isLoading } = useStaticContentContext();

    const goBack = () => {
        navigate(route.content);
    };

    let topActivities = [];

    if (!isLoading && subjects) {
        let allActivities = [];

        subjects.forEach(subject => {
            if (subject.activities) {
                subject.activities.forEach(activity => {
                    allActivities.push({
                        activity: activity,
                        subjectName: subject.name,
                    });
                });
            }
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
            path={route.popularActivities}
            hasHeader={{ goBack }}
            hasNavBar
            hasGreenBackground
            title="פעולות נפוצות"
            content="הפעולות הנפוצות ביותר באתר"
            hesAds={ACTIVITY_AD_SLOT}
        >
            <TopActivities />
            {isLoading ? (
                <SmallLoading />
            ) : (
                <article className={styles.content_article}>
                    <section className={styles.grid_container}>
                    {topActivities.length > 0 ? (
                        topActivities.map((item, index) => (
                        <Link
                            to={`${route.content}/${item.subjectName}/${item.activity.name}`}
                            className={styles.grid_item}
                            key={index}
                            onClick={() => handleActivityClick(item.activity)}
                            state={{ fromPopular: true }}  // Pass state here
                        >
                            <h2 className={styles.item_title}>{item.activity.metaTitle}</h2>
                        </Link>
                        ))
                    ) : (
                        <div>No activities found.</div>
                    )}
                    </section>
                </article>
            )}
        </PageLayout>
    );
}

export default PopularActivities;

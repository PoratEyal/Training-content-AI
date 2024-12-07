import "../../components/ActivityOutput/Markdown.css";
import styles from "./MyActivities.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { Link, useNavigate } from "react-router-dom";
import MyActivitiesTitle from "../../components/titles/MyActivitiesTitle/MyActivitiesTitle";
import helmet from "../../models/resources/helmet.json";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import { useStaticContentContext } from "../../context/StaticContentContext";

function MyActivities() {
    const navigate = useNavigate();
    const { subjects, isLoading, error } = useStaticContentContext();

    const goBack = () => {
        navigate(route.home);
    };

    return (
        <PageLayout
            path={route.content}
            hasHeader={{ goBack }}
            hasNavBar
            hesAds={ACTIVITY_AD_SLOT}
            noIndex
            hasGreenBackground
            title={helmet.content.title}
            content={helmet.content.content}
        >
            <MyActivitiesTitle />

            <article className={styles.content_article}>
            <section className={styles.grid_container}>
                {isLoading ? (
                    <SmallLoading />
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <>
                {subjects.map((subject, index) => (
                    <Link
                        to={`${route.content}/${subject.name}`}
                        key={index}
                        className={styles.grid_item}
                    >
                        <h2 className={styles.item_title}>{subject.metaTitle}</h2>
                    </Link>
                ))}
            </>
        )}
    </section>
            </article>
        </PageLayout>
    );
}

export default MyActivities;

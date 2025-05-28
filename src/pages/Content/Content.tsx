import React, { useMemo } from "react";   
import "../../components/ActivityOutput/Markdown.css";
import styles from "./Content.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { Link, useNavigate } from "react-router-dom";
import ReadyContent from "../../components/titles/ReadyContent/ReadyContent";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import PageLoading from "../../components/Loading/PageLoading/PageLoading";
import { useStaticContentContext } from "../../context/StaticContentContext";
import { Icons } from "../../components/Icons";
import { buildContentSchema } from "../../models/schemaOrg";

function Content() {
    const { subjects, isLoading, useFetchSubjectsData } = useStaticContentContext();
    const navigate = useNavigate();
    useFetchSubjectsData();

    const contentSchema = useMemo(
        () => buildContentSchema(subjects || [], route.content),
        [subjects]
    );

    const goBack = () => {
        navigate(route.home);
    };

    return (
        <PageLayout
            id="content"
            path={route.content}
            hasHeader={{ goBack }}
            hasNavBar
            hasAds={ACTIVITY_AD_SLOT}
            index={true}
            hasGreenBackground
        >

            <script type="application/ld+json">
                {JSON.stringify(contentSchema)}
            </script>

            <ReadyContent />

            <article className={styles.content_article}>
                {isLoading ? (
                    <section className={styles.grid_container}>
                        <PageLoading />
                    </section>
                ) : subjects && subjects.length > 0 ? (
                    <section className={styles.grid_container}>
                        <Link to={route.popularActivities} className={styles.grid_item}>
                            <h2 className={styles.item_title}>10 הפעולות הפופולריות</h2>
                            <div className={styles.icon}>
                                {Icons["GiPodium"] &&
                                    React.createElement(Icons["GiPodium"], {
                                        className: styles.icon,
                                    })}
                            </div>
                        </Link>
                        {subjects.map((subject, index) => (
                            <Link
                                to={`${route.content}/${subject.name}`}
                                key={index}
                                className={styles.grid_item}
                            >
                                <h2 className={styles.item_title}>{subject?.metaTitle}</h2>
                                <div className={styles.icon}>
                                    {Icons[subject.icon] &&
                                        React.createElement(Icons[subject.icon], {
                                            className: styles.icon,
                                        })}
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

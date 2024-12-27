import React from "react";
import "../../components/ActivityOutput/Markdown.css";
import styles from "./Content.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { Link, useNavigate } from "react-router-dom";
import ReadyContent from "../../components/titles/ReadyContent/ReadyContent";
import helmet from "../../models/resources/helmet.json";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import { useStaticContentContext } from "../../context/StaticContentContext";
import { Icons } from "../../components/Icons";

function Content() {
    const { subjects, isLoading, useFetchSubjectsData } = useStaticContentContext();
    const navigate = useNavigate();
    useFetchSubjectsData();
    
    const goBack = () => {
        navigate(route.home);
    };

    return (
        <PageLayout
            path={route.content}
            hasHeader={{ goBack }}
            hasNavBar
            hesAds={ACTIVITY_AD_SLOT}
            index={true}
            hasGreenBackground
            title={helmet.content.title}
            content={helmet.content.content}
        >
            <ReadyContent />

            <article className={styles.content_article}>
                {isLoading ? (
                    <section className={styles.grid_container}>
                        <SmallLoading />
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

import React from "react";
import styles from "./ActivityArticle.module.css";
import ArticleOptions from "../ArticleOptions/ArticleOptions";
import ActivityOutput from "../ActivityOutput/ActivityOutput";
import { Activity } from "../../models/types/activity";
import ArtOptEdit from "../options/article/ArtOptEdit/ArtOptEdit";
import ArtOptSave from "../options/article/ArtOptSave/ArtOptSave";
import ArtOptShare from "../options/article/ArtOptShare/ArtOptShare";
import ArtOptCopy from "../options/article/ArtOptCopy/ArtOptCopy";

type ActivityArticleProps = {
    activityRef?: React.RefObject<HTMLElement>;
    activity: Activity;
    hasEdit?: boolean;
    hasSave?: boolean;
    hasShare?: boolean;
    hasCopy?: boolean;
};

const ActivityArticle: React.FC<ActivityArticleProps> = ({
    activity,
    activityRef,
    hasEdit,
    hasSave,
    hasShare,
    hasCopy,
}) => {
    const options = [
        hasEdit ? <ArtOptEdit activity={activity} /> : null,
        hasSave ? <ArtOptSave activity={activity} /> : null,
        hasShare ? <ArtOptShare activity={activity} /> : null,
        hasCopy ? <ArtOptCopy activity={activity} /> : null,
    ].filter(Boolean);

    return (
        <section className={styles.activity_data_container}>
            <ArticleOptions Options={options} />
            <article>
                <ActivityOutput activity={activity?.activity} activityRef={activityRef} />
            </article>
            <div className={styles.padding} />
        </section>
    );
};

export default ActivityArticle;

import React from "react";
import styles from "./ActivityArticle.module.css";
import ArticleOptions from "../ArticleOptions/ArticleOptions";
import ActivityOutput from "../ActivityOutput/ActivityOutput";
import { Activity } from "../../models/types/activity";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import ArtOptSave from "../options/article/ArtOptSave/ArtOptSave";
import ArtOptEdit from "../options/article/ArtOptEdit/ArtOptEdit";
import ArtOptShare from "../options/article/ArtOptShare/ArtOptShare";
import ArtOptCopy from "../options/article/ArtOptCopy/ArtOptCopy";
import { useActivityContext } from "../../context/ActivityContext";

type ActivityArticleProps = {
    activityRef?: React.RefObject<HTMLElement>;
    activity: Activity;
    hasCopy?: boolean;
    hasEdit?: boolean;
    hasSave?: boolean;
    hasShare?: boolean;
};

const ActivityArticle: React.FC<ActivityArticleProps> = ({
    activity,
    activityRef,
    hasCopy,
    hasEdit,
    hasSave,
    hasShare,
}) => {
    /**
     * For allowing edit, 'allowEdit' flag need to raise on PageLayout
     */
    const { isEdit } = useActivityContext();

    const Options = [
        hasEdit ? <ArtOptEdit activity={activity} /> : null,
        hasSave ? <ArtOptSave activity={activity} /> : null,
        hasShare ? <ArtOptShare activity={activity} /> : null,
        hasCopy ? <ArtOptCopy activity={activity} /> : null,
    ].filter(Boolean);

    return isEdit ? (
        <section className={styles.activity_data_container}>
            <RichTextEditor activity={activity} />
        </section>
    ) : (
        <section className={styles.activity_data_container}>
            <ArticleOptions Options={Options} />
            <article>
                <ActivityOutput
                    title={activity.subject}
                    activity={activity?.activity}
                    activityRef={activityRef}
                />
            </article>
            <div className={styles.padding} />
        </section>
    );
};

export default ActivityArticle;

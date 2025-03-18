import React from "react";
import styles from "./ArticleOptions.module.css";
import ArtOptSave from "../options/article/ArtOptSave/ArtOptSave";
import ArtOptCopy from "../options/article/ArtOptCopy/ArtOptCopy";
import ArtOptShare from "../options/article/ArtOptShare/ArtOptShare";
import ArtOptEdit from "../options/article/ArtOptEdit/ArtOptEdit";
import { Activity } from "../../models/types/activity";

type ArticleOptionsProps = {
    activity: Activity;
    hasSave?: boolean;
    hasEdit?: boolean;
    hasCopy?: boolean;
    hasShare?: boolean;
};

const ArticleOptions: React.FC<ArticleOptionsProps> = ({ activity, hasSave, hasEdit, hasCopy, hasShare }) => {
    const Options = [
        hasSave ? <ArtOptSave activity={activity} /> : null,
        hasEdit ? <ArtOptEdit activity={activity} /> : null,
        hasShare ? <ArtOptShare activity={activity} /> : null,
        hasCopy ? <ArtOptCopy activity={activity} /> : null,
    ].filter(Boolean);

    return (
        <div className={`${styles.article_options} ${styles.full_width}`}>
            {Options.map((Option, index) => (
                <React.Fragment key={index}>
                    <div className={styles.option}>{Option}</div>
                    {index < Options.length - 1 && <div className={styles.separator} />}
                </React.Fragment>
            ))}
        </div>
    );
};

export default ArticleOptions;

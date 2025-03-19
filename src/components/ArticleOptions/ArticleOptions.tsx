import React from "react";
import styles from "./ArticleOptions.module.css";

type ArticleOptionsProps = {
    Options: JSX.Element[];
};

const ArticleOptions: React.FC<ArticleOptionsProps> = ({ Options }) => {
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

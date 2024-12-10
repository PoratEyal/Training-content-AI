import React from "react";
import styles from "./ActivityOutput.module.css";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CustomBr from "./CustomBr";
import "./Markdown.css";

type ActivityOutputProps = {
    activity: string;
    activityRef?: React.MutableRefObject<HTMLElement>;
};

//TODO: whats going on here?
function ActivityOutput({ activity, activityRef }: ActivityOutputProps) {
    const activityParts = activity.split("\\n");

    return (
        <section className={styles.activity_output_container}>
            <section className={styles.activity_container} id="markdown" ref={activityRef}>
                {activityParts.map((part, index) => (
                    <React.Fragment key={index}>
                        <ReactMarkdown
                            className={styles.activity_data}
                            rehypePlugins={[rehypeRaw]}
                        >
                            {part}
                        </ReactMarkdown>
                        {index < activityParts.length - 1 && <CustomBr />}
                    </React.Fragment>
                ))}
            </section>
        </section>
    );
}

export default ActivityOutput;

import React from "react";
import styles from "./ActivityOutput.module.css";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./Markdown.css";

type OutputTestProps = {
    activity: string;
    activityRef?: React.MutableRefObject<HTMLElement>;
};

//TODO: to delete
function OutputTest({ activity, activityRef }: OutputTestProps) {
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
                        {index < activityParts.length - 1 && <div style={{ marginBottom: "5px" }} aria-hidden="true"></div>}
                    </React.Fragment>
                ))}
            </section>
        </section>
    );
}

export default OutputTest;
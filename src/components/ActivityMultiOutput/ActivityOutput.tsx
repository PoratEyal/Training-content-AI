import { useState } from "react";
import styles from "./ActivityMultiOutput.module.css";
import ReactMarkdown from "react-markdown";
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";
import "../ActivityOutput/Markdown.css";

type ActivityMultiOutputProps = {
    activities: any[];
};

function ActivityMultiOutput({ activities }: ActivityMultiOutputProps) {
    return (
        <section className={styles.activity_output_container}>
            <section className={styles.activity_container} id="markdown">
                {activities.map((activity, index) => (
                    <span>
                        <ReactMarkdown key={index} className={styles.activity_data}>
                            {activity.content}
                        </ReactMarkdown>
                        <br />
                        <div className={styles.border}/>
                        <br />
                    </span>
                ))}
            </section>
        </section>
    );
}
export default ActivityMultiOutput;


// const [currentIndex, setCurrentIndex] = useState(0);
// const handlePrev = () => {
//     setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
// };
// const handleNext = () => {
//     setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, activities.length - 1));
// };

{
    /* <section className={styles.activity_output_container}>
            <section className={styles.activity_container} id="markdown">
                <ReactMarkdown className={styles.activity_data}>
                    {activities[currentIndex].content}
                </ReactMarkdown>
            </section>
            {activities.length > 1 ? (
                <div className={styles.buttons}>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === activities.length - 1}
                        className={styles.button_prev}
                        >
                        <IoMdArrowRoundForward />
                    </button>
                    <div className={styles.current_place}>
                        {activities.length} / {currentIndex + 1}
                    </div>
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className={styles.button_next}
                    >
                        <IoMdArrowRoundBack />
                    </button>
                </div>
            ) : null}
            <br />
        </section> */
}

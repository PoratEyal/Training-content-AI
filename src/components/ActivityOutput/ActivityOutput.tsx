import { useState } from "react";
import styles from "./ActivityOutput.module.css";
import ReactMarkdown from "react-markdown";
import MoreActions from "../MoreActions/MoreActions";
import { MovementPath } from "../../models/types/movement";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import "./Markdown.css";

type ActivityOutputProps = {
    index: number;
    movementPath: MovementPath;
    defualtOpen?: boolean;
};

function ActivityOutput({ index, movementPath, defualtOpen = true }: ActivityOutputProps) {
    const { title, activity } = movementPath;
    const [isOpened, setIsOpened] = useState(defualtOpen);
    
    const handleOpen = () => {
        setIsOpened((prev) => !prev);
    };
    
    return (
        <section>
            <div className={styles.spacer}></div>
            <div onClick={handleOpen} className={`${styles.activity_close} ${isOpened ? styles.activityOpen : ''}`}>
                <motion.div
                    className={styles.toggel_arrow_animation}
                    animate={{ rotate: isOpened ? 0 : 90 }}
                    transition={{ duration: 0.2 }}
                >
                    <IoIosArrowDown />
                </motion.div>
                <div>{title}</div>
            </div>
            {isOpened ? (
                <section className={styles.activity_contianer} id="markdown">
                    {activity ? <ReactMarkdown className={styles.activity_data}>{activity?.activity}</ReactMarkdown> : null}
                    <MoreActions index={index} movementPath={movementPath} />
                </section>
            ) : null}
        </section>
    );
}

export default ActivityOutput;

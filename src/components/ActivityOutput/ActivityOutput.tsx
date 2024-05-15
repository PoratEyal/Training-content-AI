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

function ActivityOutput({ index, movementPath, defualtOpen = false }: ActivityOutputProps) {
    const { title, activity } = movementPath;
    const [isOpened, setIsOpened] = useState(defualtOpen);
    
    const handleOpen = () => {
        setIsOpened((prev) => !prev);
    };
    
    return (
        <section>
            <div onClick={handleOpen} className={styles.activity_close}>
                <motion.div
                    className={styles.toggel_arrow_animation}
                    animate={{ rotate: isOpened ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <IoIosArrowDown />
                </motion.div>
                {title}
            </div>
            {isOpened ? (
                <section className={styles.activity_contianer} id="markdown">
                    <div className={styles.activity_title}>{title}</div>
                    {activity ? <ReactMarkdown>{activity?.activity}</ReactMarkdown> : null}
                    <MoreActions index={index} movementPath={movementPath} />
                </section>
            ) : null}
        </section>
    );
}

export default ActivityOutput;

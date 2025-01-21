import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./MoreOptionsCollapse.module.css";
import Collapse from "../core/Collapse/Collapse";
import useToggle from "../../hooks/useToggle";
import { motion } from "framer-motion";

type MoreOptionsCollapseProps = {
    children: React.ReactNode | React.ReactNode[];
};

const MoreOptionsCollapse: React.FC<MoreOptionsCollapseProps> = ({ children }) => {
    const [isOpen, toggle] = useToggle(false);

    const handleCollapse = () => {
        toggle();
        //TODO: add scrolling
    };

    return (
        <div className={styles.options_collapse_container}>
            <span className={styles.options_container} onClick={handleCollapse}>
                <label className={styles.collapse_text}>אפשרויות נוספות</label>
                <span className={styles.sizeMedium}>
                    <motion.div
                        className={styles.toggelArrowAnimation}
                        animate={{ rotate: isOpen ? -90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <IoIosArrowBack />
                    </motion.div>
                </span>
            </span>
            <Collapse isOpen={isOpen} diraction="down">
                <section className={styles.collapse_form}>{children}</section>
            </Collapse>
        </div>
    );
};

export default MoreOptionsCollapse;

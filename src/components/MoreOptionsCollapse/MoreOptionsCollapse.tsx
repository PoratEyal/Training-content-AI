import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./MoreOptionsCollapse.module.css";
import Collapse from "../core/Collapse/Collapse";
import useToggle from "../../hooks/useToggle";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type MoreOptionsCollapseProps = {
    children: React.ReactNode | React.ReactNode[];
    text?: string;
};

const MoreOptionsCollapse: React.FC<MoreOptionsCollapseProps> = ({ children, text }) => {
    const [isOpen, toggle] = useToggle(false);
    const { t } = useTranslation();

    const handleCollapse = () => {
        toggle();
        //TODO: add scrolling
    };

    return (
        <div className={styles.options_collapse_container}>
            <span className={styles.options_container} onClick={handleCollapse}>
                <label className={styles.collapse_text}>{text ? t(text) : t("moreOptions")}</label>
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

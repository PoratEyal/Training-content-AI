import React, { useRef } from "react";
import styles from "./AboutUsCollapse.module.css";
import Collapse from "../core/Collapse/Collapse";
import useToggle from "../../hooks/useToggle";
import useClickOutside from "../../hooks/useClickOutside";
import { useLanguage } from "../../i18n/useLanguage";

type AboutUsCollapseProps = {
    children: React.ReactNode | React.ReactNode[];
};

const AboutUsCollapse: React.FC<AboutUsCollapseProps> = ({ children }) => {
    const { t, dir } = useLanguage();
    const [isOpen, toggle, close] = useToggle(false);
    const modalRef = useRef<any>(null);
    useClickOutside(modalRef, () => close());

    const handleCollapse = () => {
        toggle();
    };

    return (
        <div ref={modalRef} className={styles.about_collapse_container} style={{ direction: dir }}>
            <Collapse isOpen={isOpen} diraction="up">
                <section className={styles.collapse_form}>{children}</section>
            </Collapse>
            <span className={styles.about_container} onClick={handleCollapse}>
                <label>{t("aboutUs.title")}</label>
            </span>
        </div>
    );
};

export default AboutUsCollapse;

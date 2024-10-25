import React, { useRef } from "react";
import styles from "./AboutUsCollapse.module.css";
import Collapse from "../core/Collapse/Collapse";
import useToggle from "../../hooks/useToggle";
import { HiUserGroup } from "react-icons/hi2";
import useClickOutside from "../../hooks/useClickOutside";

type AboutUsCollapseProps = {
    children: React.ReactNode | React.ReactNode[];
};

const AboutUsCollapse: React.FC<AboutUsCollapseProps> = ({ children }) => {
    const [isOpen, toggle, close] = useToggle(false);
    const modalRef = useRef<any>(null);
    useClickOutside(modalRef, () => close());

    const handleCollapse = () => {
        toggle();
        //TODO: add scrolling
    };

    return (
        <div ref={modalRef} className={styles.about_collapse_container}>
            <Collapse isOpen={isOpen}>
                <section className={styles.collapse_form}>{children}</section>
            </Collapse>
            <span className={styles.about_container} onClick={handleCollapse}>
                <HiUserGroup className={styles.icon_privacy} />
                <label>אודות</label>
            </span>
        </div>
    );
};

export default AboutUsCollapse;

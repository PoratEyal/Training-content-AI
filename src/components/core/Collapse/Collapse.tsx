import React from "react";
import styles from "./Collapse.module.css";
import { m, LazyMotion, domAnimation } from "framer-motion";

export type CollapseProps = {
    children: React.ReactNode | React.ReactNode[];
    isOpen: boolean;
};

const Collapse: React.FC<CollapseProps> = ({ children, isOpen }) => {
    const tweenAnimation = (isOpen: boolean) => {
        return {
            transition: { type: "tween" },
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0.5,
        };
    };

    return (
        <LazyMotion features={domAnimation} strict>
            <div
                aria-expanded={isOpen}
                data-timeout="auto"
                style={{ position: "relative", fontSize: 12 }}
            >
                <m.div
                    className={styles.collapse}
                    initial={{ height: 0, opacity: 1 }}
                    animate={tweenAnimation(isOpen)}
                    exit={{ height: 0, opacity: 1 }}
                >
                    {children}
                </m.div>
            </div>
        </LazyMotion>
    );
};

export default Collapse;

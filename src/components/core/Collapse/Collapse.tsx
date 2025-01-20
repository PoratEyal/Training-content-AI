import React from "react";
import styles from "./Collapse.module.css";
import { m, LazyMotion, domAnimation } from "framer-motion";

export type CollapseProps = {
    children: React.ReactNode | React.ReactNode[];
    isOpen: boolean;
    diraction?: "up" | "down";
};

const Collapse: React.FC<CollapseProps> = ({ children, isOpen, diraction }) => {
    const tweenAnimationUp = (isOpen: boolean) => {
        return {
            transition: { type: "tween" },
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0.5,
        };
    };

    const tweenAnimationDown = (isOpen: boolean) => {
        return {
            transition: { type: "tween" },
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0.5,
            y: isOpen ? 0 : -10,
        };
    };

    return (
        <LazyMotion features={domAnimation} strict>
            <div
                aria-expanded={isOpen}
                data-timeout="auto"
                className={diraction === "up" ? styles.collapse_container_absolute : styles.collapse_container_relative}
            >
                <m.div
                    initial={{ height: 0, opacity: 1 }}
                    className={diraction === "up" ? styles.collapse_absolute : styles.collapse_relative}
                    animate={diraction === "up" ? tweenAnimationUp(isOpen) : tweenAnimationDown(isOpen)}
                    exit={diraction === "up" ? tweenAnimationUp(isOpen) : tweenAnimationDown(isOpen)}
                >
                    {children}
                </m.div>
            </div>
        </LazyMotion>
    );
};

export default Collapse;

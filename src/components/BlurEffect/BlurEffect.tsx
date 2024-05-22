import { motion } from "framer-motion";
import styles from "./BlurEffect.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

type BlurEffectProps = {
    height?: string;
    hasText?: boolean;
    children: React.ReactNode;
};

function BlurEffect({ height, hasText = false, children }: BlurEffectProps) {
    const [reachBottom, setReachBottom] = useState(false);

    const handleScroll = (e) => {
        console.log("scrolling");
        const bottom =
            Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) <= 1;

        if (bottom) {
            setReachBottom(true);
        } else if (reachBottom) setReachBottom(false);
    };

    return (
        <section
            className={styles.section_contianer}
            style={{ maxHeight: height }}
            onScroll={handleScroll}
        >
            {children}
            <motion.div
                className={styles.blur_effect}
                animate={{ opacity: reachBottom ? 0 : 1, display: reachBottom ? "none" : "block" }}
                transition={{ duration: 0.1 }}
            >
                {hasText ? (
                    <div className={styles.blur_text}>
                        גלול למטה לאישור המדיניות
                        <IoIosArrowDown />
                    </div>
                ) : (
                    <div className={styles.blur_no_text}>blur effect</div>
                )}
            </motion.div>
        </section>
    );
}

export default BlurEffect;

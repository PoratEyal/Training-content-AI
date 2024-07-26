import { motion } from "framer-motion";
import styles from "./FadeEffect.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

type FadeEffectProps = {
    hasFade?: boolean;
    hasText?: boolean;
    children: React.ReactNode;
};

function FadeEffect({
    hasFade = true,
    hasText = false,
    children,
}: FadeEffectProps) {
    const [reachBottom, setReachBottom] = useState(false);

    const handleScroll = (e) => {
        const bottom =
            Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) <= 1;

        if (bottom) {
            setReachBottom(true);
        } else if (reachBottom) setReachBottom(false);
    };

    if (!hasFade) {
        return <section className={styles.section_contianer}>{children}</section>;
    }

    return (
        <section className={styles.section_contianer} onScroll={handleScroll}>
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

export default FadeEffect;

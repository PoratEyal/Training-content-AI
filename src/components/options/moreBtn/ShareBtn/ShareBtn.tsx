import React from "react";
import styles from "./ShareBtn.module.css";
import { FaShare } from "react-icons/fa";
import { motion } from "framer-motion";
import { Activity } from "../../../../models/types/activity";

type ShareBtnProps = {
    index: number;
    buttonVariants: any;
    activity: Activity;
};

const ShareBtn: React.FC<ShareBtnProps> = ({ index, buttonVariants, activity }) => {
    const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();

        const shareText = activity.activity;

        const shareData = {
            title: "Check out this activity!",
            text: shareText,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            console.error("Share not supported by the browser");
        }
    };

    return (
        <motion.div
            className={styles.shareBtn}
            onClick={handleClick}
            // custom={options.length - 1 - index}
            custom={4 - 1 - index}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <FaShare className={styles.icon} />
        </motion.div>
    );
};

export default ShareBtn;

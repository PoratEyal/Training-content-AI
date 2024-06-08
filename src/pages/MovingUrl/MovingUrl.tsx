import React, { useState } from "react";
import styles from "./MovingUrl.module.css";
import { FaRegCopy } from "react-icons/fa6";

function MovingUrl() {
    const [buttonLabel, setButtonLabel] = useState("העתיקו את הקישור");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText("https://activitywiz.com");
            setButtonLabel("הקישור הועתק");
            setTimeout(() => {
                setButtonLabel("העתיקו את הקישור");
            }, 2000); // Reset the label after 2 seconds
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <div className={styles.container}>
            <img
                className={styles.img}
                alt="Man fixing laptop with tools and gears."
                src="logo.svg"
            ></img>

            <div className={styles.div}>האתר השתדרג ביכולות ועברנו לכתובת חדשה:</div>
            <div className={styles.link}>https://activitywiz.com</div>

            <button className={styles.copy_btn} onClick={handleCopy}>
                <label>{buttonLabel}</label>
                <FaRegCopy className={styles.icon}></FaRegCopy>
            </button>
        </div>
    );
}

export default MovingUrl;

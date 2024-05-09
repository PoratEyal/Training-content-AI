import React from "react";
import styles from "./Logo.module.css";

type LogoProps = {
    size?: "small" | "medium" | "large";
};

function Logo({ size = "small" }: LogoProps) {
    const fontSize = size === "small" ? "16px" : size === "medium" ? "18px" : "20px";
    return (
        <div className={styles.logo} style={{ fontSize }}>
            LOGO
        </div>
    );
}

export default Logo;

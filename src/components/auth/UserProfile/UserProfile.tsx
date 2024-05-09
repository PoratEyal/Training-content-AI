import React from "react";
import { CiUser } from "react-icons/ci";
import styles from "./UserProfile.module.css";

type UserProfileProps = {
    size?: "small" | "medium" | "large";
    img?: string;
};

//TODO: add your google image
function UserProfile({ size = "small" }: UserProfileProps) {
    const fontSize = size === "small" ? "16px" : size === "medium" ? "18px" : "24px";
    return (
        <div className={styles.user_profile_img} style={{ fontSize }}>
            <CiUser />
        </div>
    );
}

export default UserProfile;

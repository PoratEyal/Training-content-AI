import React from "react";
import styles from "./UserImage.module.css";

type UserImageProps = {
    size?: "small" | "medium" | "large";
    img: string;
};

function UserImage({ img, size = "small" }: UserImageProps) {
    const fontSize = size === "small" ? "16px" : size === "medium" ? "18px" : "24px";

    return (
        <div className={styles.img_div}>
            <img className={styles.user_profile_img} src={img} alt="Profile image" />
        </div>
    );
}

export default UserImage;

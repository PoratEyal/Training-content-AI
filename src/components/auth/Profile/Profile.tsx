import React from "react";
import UserProfile from "../UserProfile/UserProfile";
import styles from "./Profile.module.css";

type ProfileProps = {
    img?: string;
    name: string;
    role: string;
};

function Profile({ img, name, role }: ProfileProps) {
    return (
        <div className={styles.user_profile}>
            <UserProfile img={img} size="small" />
            <div className={styles.user_profile_description}>
                <span className={styles.user_profile_name}>{name}</span>
                <span className={styles.user_profile_role}>{role}</span>
            </div>
        </div>
    );
}

export default Profile;

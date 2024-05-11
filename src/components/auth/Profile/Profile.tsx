import React from "react";
import UserImage from "../UserImage/UserImage";
import styles from "./Profile.module.css";

type ProfileProps = {
    img: string;
    name: string;
    role: string;
};

function Profile({ img, name, role }: ProfileProps) {
    return (
        <div className={styles.user_profile}>
            <UserImage img={img} size="small" />
            {/* <div className={styles.user_profile_description}>
                <span className={styles.user_profile_name}>{name}</span>
                <span className={styles.user_profile_role}>{role}</span>
            </div> */}
        </div>
    );
}

export default Profile;

import React, { useState } from "react";
import UserImage from "../UserImage/UserImage";
import styles from "./Profile.module.css";
import Dropdown from "../../Layout/Dropdown/Dropdown";

type ProfileProps = {
    img: string;
    name: string;
    role: string;
};

function Profile({ img, name, role }: ProfileProps) {
    const [isOpened, setIsOpened] = useState(false);
    const handleOpen = () => setIsOpened(prev => !prev);
    const handleClose = () => setIsOpened(false);

    return (
        <div style={{position: "relative"}}>
            <div className={styles.user_profile} onClick={handleOpen}>
                <UserImage img={img} size="small" />
                {/* <div className={styles.user_profile_description}>
                    <span className={styles.user_profile_name}>{name}</span>
                    <span className={styles.user_profile_role}>{role}</span>
                </div> */}
            </div>
            {isOpened ? <Dropdown handleClose={handleClose} /> : null}
        </div>
    );
}

export default Profile;

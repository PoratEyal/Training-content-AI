import { useState } from "react";
import styles from "./Profile.module.css";
import Dropdown from "../Layout/Dropdown/Dropdown";
import DropOptContactUs from "../options/dropdown/DropOptContactUs";
import DropOptInviteFriends from "../options/dropdown/DropOptInviteFriends";
import DropOptPrivacy from "../options/dropdown/DropOptPrivacy";
import DropOptLogout from "../options/dropdown/DropOptLogout";
import { useAuthContext } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import DropOptSignIn from "../options/dropdown/DropOptSignIn";
import useToggle from "../../hooks/useToggle";

type ProfileProps = {
    img?: string;
};

function Profile({ img }: ProfileProps) {
    const { isLoggedIn } = useAuthContext();
    const [isOpen, toggle, close] = useToggle(false);

    return (
        <div style={{ position: "relative" }}>
            <div className={styles.user_profile} onClick={toggle}>
                <div className={styles.img_div}>
                    {img ? (
                        <img
                            className={styles.user_profile_img}
                            src={img}
                            height={30}
                            width={30}
                            alt="Profile image"
                            title="Profile image"
                        />
                    ) : (
                        <FaUserCircle className={styles.no_user_profile_img} />
                    )}
                </div>
            </div>
            {isOpen ? (
                <Dropdown handleClose={close}>
                    <DropOptInviteFriends />
                    <DropOptContactUs handleClose={close} />
                    <DropOptPrivacy handleClose={close} />
                    {isLoggedIn ? (
                        <DropOptLogout handleClose={close} />
                    ) : (
                        <DropOptSignIn handleClose={close} />
                    )}
                </Dropdown>
            ) : null}
        </div>
    );
}

export default Profile;

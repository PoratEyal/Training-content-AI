import { useState } from "react";
import styles from "./Profile.module.css";
import Dropdown from "../Layout/Dropdown/Dropdown";
import DropOptContactUs from "../dropdown/DropOptContactUs";
import DropOptInviteFriends from "../dropdown/DropOptInviteFriends";
import DropOptPrivacy from "../dropdown/DropOptPrivacy";
import DropOptLogout from "../dropdown/DropOptLogout";
import { useAuthContext } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import DropOptSignIn from "../dropdown/DropOptSignIn";

type ProfileProps = {
    img?: string;
};

function Profile({ img }: ProfileProps) {
    const { isLoggedIn } = useAuthContext();
    const [isOpened, setIsOpened] = useState(false);
    const handleOpen = () => setIsOpened((prev) => !prev);
    const handleClose = () => setIsOpened(false);

    return (
        <div style={{ position: "relative" }}>
            <div className={styles.user_profile} onClick={handleOpen}>
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
            {isOpened ? (
                <Dropdown handleClose={handleClose}>
                    <DropOptInviteFriends />
                    <DropOptContactUs handleClose={handleClose} />
                    <DropOptPrivacy handleClose={handleClose} />
                    {isLoggedIn ? (
                        <DropOptLogout handleClose={handleClose} />
                    ) : (
                        <DropOptSignIn handleClose={handleClose} />
                    )}
                    {/* <DropOptExample handleClose={handleClose} /> */}
                </Dropdown>
            ) : null}
        </div>
    );
}

export default Profile;

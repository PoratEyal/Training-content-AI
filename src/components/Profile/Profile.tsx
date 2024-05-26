import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import Dropdown from "../Layout/Dropdown/Dropdown";

type ProfileProps = {
    img: string;
};

function Profile({ img }: ProfileProps) {
    const [isOpened, setIsOpened] = useState(false);
    const handleOpen = () => setIsOpened((prev) => !prev);
    const handleClose = () => setIsOpened(false);
    const [profileImg, setProfileImg] = useState<string>(img);

    useEffect(() => {
        if (img) setProfileImg(img);
    }, [img]);

    return (
        <div style={{ position: "relative" }}>
            <div className={styles.user_profile} onClick={handleOpen}>
                <div className={styles.img_div}>
                    <img className={styles.user_profile_img} src={profileImg} alt="Profile image" />
                </div>
            </div>
            {isOpened ? <Dropdown handleClose={handleClose} /> : null}
        </div>
    );
}

export default Profile;

import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import Dropdown from "../Layout/Dropdown/Dropdown";

type ProfileProps = {
    img: string | undefined;
};

function Profile({ img }: ProfileProps) {
    const [isOpened, setIsOpened] = useState(false);
    const handleOpen = () => setIsOpened((prev) => !prev);
    const handleClose = () => setIsOpened(false);

    return (
        <div style={{ position: "relative" }}>
            <div className={styles.user_profile} onClick={handleOpen}>
                {img ? (
                    <div className={styles.img_div}>
                        <img
                            className={styles.user_profile_img}
                            src={img}
                            height={30}
                            width={30}
                            alt="Profile image"
                            title="Profile image"
                        />
                    </div>
                ) : (
                    <div className={styles.mock_img_div} />
                )}
            </div>
            {isOpened ? <Dropdown handleClose={handleClose} /> : null}
        </div>
    );
}

export default Profile;

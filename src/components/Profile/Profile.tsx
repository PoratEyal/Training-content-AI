import styles from "./Profile.module.css";
import Dropdown from "../Layout/Dropdown/Dropdown";
import DropOptContactUs from "../options/dropdown/DropOptContactUs";
import DropOptInviteFriends from "../options/dropdown/DropOptInviteFriends";
import DropOptPrivacy from "../options/dropdown/DropOptPrivacy";
import DropOptLogout from "../options/dropdown/DropOptLogout";
import { useAuthContext } from "../../context/AuthContext";
import DropOptSignIn from "../options/dropdown/DropOptSignIn";
import DropOptLang from "../options/dropdown/DropOptLang";
import DropOptFAQ from "../options/dropdown/DropOptFAQ";
import useToggle from "../../hooks/useToggle";
import { Icons } from "../Icons";

type ProfileProps = {
    img?: string;
    isLoading: boolean;
    openLangPopup: () => void;
};

function Profile({ img, isLoading, openLangPopup }: ProfileProps) {
    const { isLoggedIn } = useAuthContext();
    const [isOpen, toggle, close] = useToggle(false);

    return (
        <div style={{ position: "relative" }}>
            {isLoading ? (
                <div className={styles.user_profile}>
                    <div className={styles.img_div}>
                        <Icons.user className={styles.no_user_profile_img} />
                    </div>
                </div>
            ) : (
                <div className={styles.user_profile} onClick={toggle}>
                    <div className={styles.img_div}>
                        {img ? (
                            <img
                                className={styles.user_profile_img}
                                src={img}
                                height={30}
                                width={30}
                                alt="Profile"
                                title="Profile"
                            />
                        ) : (
                            <Icons.user className={styles.no_user_profile_img} />
                        )}
                    </div>
                </div>
            )}

            {isOpen ? (
                <Dropdown handleClose={close}>
                    <DropOptInviteFriends />
                    <DropOptContactUs handleClose={close} />
                    <DropOptPrivacy handleClose={close} />
                    <DropOptFAQ handleClose={close} />
                    <DropOptLang handleClose={close} openLangPopup={openLangPopup} />
                    <hr className={styles.dropdown_divider} />
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

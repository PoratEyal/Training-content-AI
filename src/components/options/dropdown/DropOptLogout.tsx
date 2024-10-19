import styles from "./dropdown.module.css";
import { MdLogout } from "react-icons/md";
import { useContentContext } from "../../../context/ContentContext";
import { useAuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";

type DropdownOption = {
    handleClose: () => void;
};

function DropOptLogout({ handleClose }: DropdownOption) {
    const { clearAll } = useContentContext();
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        clearAll();
    };

    const handleClick = async () => {
        await handleLogout();
        navigate(route.home);
        handleClose();
    };

    return (
        <span className={styles.text_and_icon} onClick={() => handleClick()}>
            התנתקות
            <MdLogout />
        </span>
    );
}

export default DropOptLogout;

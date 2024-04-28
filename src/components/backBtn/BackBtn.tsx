import styles from "./backBtn.module.css";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";

function BackBtn({ path }) {
    const { resetAllUseFields } = useContentContext();
    const navigate = useNavigate();

    const goingBack = () => {
        resetAllUseFields();
        navigate(path);
    };

    return <IoArrowForward onClick={goingBack} className={styles.back_icon}></IoArrowForward>;
}

export default BackBtn;

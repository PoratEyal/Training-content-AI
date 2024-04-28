import styles from "./BackBtn.module.css";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";

function BackBtn({ path }) {
    const { resetAllUseFields } = useContentContext();
    const navigate = useNavigate();

    const goingBack = () => {
        //TODO: do I need resetAllUseFields?
        resetAllUseFields();
        navigate(path);
    };

    return <IoArrowForward onClick={goingBack} className={styles.back_icon}></IoArrowForward>;
}

export default BackBtn;

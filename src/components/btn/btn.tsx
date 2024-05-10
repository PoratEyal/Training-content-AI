import styles from "./btn.module.css";
import { FiChevronsLeft } from "react-icons/fi";

function Btn({ func, height, text, isDisabled }) {

    const btnClassName = `${styles.home_start_btn} ${isDisabled ? styles.home_start_btn_disabled : ''}`;

    return (
        <div onClick={!isDisabled ? func : undefined} className={btnClassName} style={{ height }}>
            <label>{text}</label>
            <div className={styles.btn_icon}>
                <FiChevronsLeft className={styles.icon} />
            </div>
        </div>
    );
}

export default Btn;

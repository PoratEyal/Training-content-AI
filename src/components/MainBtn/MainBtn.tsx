import styles from "./MainBtn.module.css";
import { FiChevronsLeft } from "react-icons/fi";

type MainBtnProps = {
    type?: "button" | "submit";
    func: (e: any) => void;
    height: number;
    text: string;
    isDisabled: boolean;
};

function MainBtn({ func, height, text, isDisabled, type = "button" }: MainBtnProps) {
    const btnClassName = `${styles.home_start_btn} ${isDisabled ? styles.home_start_btn_disabled : ""}`;

    return (
        <button
            type={type}
            onClick={!isDisabled ? func : undefined}
            className={btnClassName}
            style={{ height }}
        >
            <label style={{ opacity: isDisabled ? 0.5 : 1 }}>{text}</label>
            <div className={styles.btn_icon} style={{ opacity: isDisabled ? 0.5 : 1 }}>
                <FiChevronsLeft className={styles.icon} />
            </div>
        </button>
    );
}

export default MainBtn;

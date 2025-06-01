//
// This is a general-purpose button component that adjusts to RTL languages and shows a loading spinner if needed
//
import styles from "./MainBtn.module.css";
import SmallLoading from "../Loading/SmallLoading/SmallLoading";
import { useLanguage } from "../../i18n/useLanguage";

type MainBtnProps = {
    type?: "button" | "submit";
    func: (e: any) => void;
    height: number;
    isLoading?: boolean;
    text: string;
    isDisabled: boolean;
};

function MainBtn({
    func,
    height,
    text,
    isLoading = false,
    isDisabled,
    type = "button",
}: MainBtnProps) {
    const { dir } = useLanguage();
    const btnClassName = `${styles.main_btn} ${isDisabled ? styles.main_btn_disabled : ""}`;

    return (
        <button
            type={type}
            onClick={!isDisabled ? func : undefined}
            disabled={isDisabled}
            className={btnClassName}
            style={{ height }}
        >
            {isLoading ? (
                <div className={styles.btn_loading}>
                    <SmallLoading />
                </div>
            ) : (
                <div className={styles.btn} style={{ direction: dir }}>
                    <span style={{ opacity: isDisabled ? 0.5 : 1 }}>{text}</span>
                </div>
            )}
        </button>
    );
}

export default MainBtn;

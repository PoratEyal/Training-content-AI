//
// This is a general-purpose start button that adjusts layout and icon direction for RTL languages and shows a loading spinner if needed
//
import styles from "./StartBtn.module.css";
import SmallLoading from "../Loading/SmallLoading/SmallLoading";
import { Icons } from "../Icons";
import { useLanguage } from "../../i18n/useLanguage";

type StartBtnProps = {
    onClick: (e: any) => void;
    isLoading?: boolean;
    isDisabled: boolean;
    text: string;
};

function StartBtn({ onClick, text, isDisabled, isLoading = false }: StartBtnProps) {
    const { dir, isRTL } = useLanguage();

    const btnClassName = `${styles.main_btn} ${isDisabled ? styles.main_btn_disabled : ""}`;

    return (
        <button
            onClick={!isDisabled ? onClick : undefined}
            className={btnClassName}
            disabled={isDisabled}
        >
            {isLoading ? (
                <div className={styles.btn_loading}>
                    <SmallLoading />
                </div>
            ) : (
                <div className={styles.btn} style={{ direction: dir }}>
                    <span style={{ opacity: isDisabled ? 0.5 : 1 }}>{text}</span>
                    <div className={styles.btn_icon} style={{ opacity: isDisabled ? 0.5 : 1 }}>
                        <Icons.chevronsLeft
                            className={styles.icon}
                            style={{ transform: isRTL ? "none" : "rotate(180deg)" }} // fixed!
                        />
                    </div>
                </div>
            )}
        </button>
    );
}

export default StartBtn;

import React from "react";
import styles from "./MainBtn.module.css";

import SmallLoading from "../Loading/SmallLoading/SmallLoading";
import { Icons } from "../Icons";

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
                <div className={styles.btn}>
                    <span style={{ opacity: isDisabled ? 0.5 : 1 }}>{text}</span>
                    <div className={styles.btn_icon} style={{ opacity: isDisabled ? 0.5 : 1 }}>
                        <Icons.chevronsLeft className={styles.icon} />
                    </div>
                </div>
            )}
        </button>
    );
}

export default MainBtn;

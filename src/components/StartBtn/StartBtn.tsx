import React from "react";
import styles from "./StartBtn.module.css";
import SmallLoading from "../Loading/SmallLoading/SmallLoading";
import { Icons } from "../Icons";
import { useTranslation } from "react-i18next";

type StartBtnProps = {
    onClick: (e: any) => void;
    isLoading?: boolean;
    isDisabled: boolean;
    text: string;
};

function StartBtn({ onClick, text, isDisabled, isLoading = false }: StartBtnProps) {
    const { i18n } = useTranslation();
    const btnClassName = `${styles.main_btn} ${isDisabled ? styles.main_btn_disabled : ""}`;
    const isRTL = i18n.dir() === "rtl";

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
                <div className={styles.btn} style={{ direction: isRTL ? "rtl" : "ltr" }}>
                    <span style={{ opacity: isDisabled ? 0.5 : 1 }}>{text}</span>
                    <div className={styles.btn_icon} style={{ opacity: isDisabled ? 0.5 : 1 }}>
                        <Icons.chevronsLeft className={styles.icon} style={{ transform: isRTL ? "none" : "rotate(180deg)" }} />
                    </div>
                </div>
            )}
        </button>
    );
}

export default StartBtn;

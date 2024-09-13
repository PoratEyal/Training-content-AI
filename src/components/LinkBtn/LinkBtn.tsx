import React from "react";
import styles from "./LinkBtn.module.css";
import SmallLoading from "../Loading/SmallLoading/SmallLoading";

type LinkBtnProps = {
    onClick: (e: any) => void;
    isLoading?: boolean;
    isDisabled: boolean;
    text: string;
};

function LinkBtn({ onClick, text, isDisabled, isLoading = false }: LinkBtnProps) {
    return (
        <button onClick={!isDisabled ? onClick : undefined} className={styles.link_btn}>
            {isLoading ? <SmallLoading /> : text}
        </button>
    );
}

export default LinkBtn;

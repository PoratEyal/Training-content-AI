import React from "react";
import styles from "./SendBtn.module.css";
import { VscLoading } from "react-icons/vsc";

function SendBtn({ isDisabled, isLoading }) {
    return (
        <button disabled={isDisabled} className={styles.submit_btn} type="submit">
            {!isLoading ? "שלח" : <VscLoading className={styles.loading_icon}></VscLoading>}
        </button>
    );
}

export default SendBtn;

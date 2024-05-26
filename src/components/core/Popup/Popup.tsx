import React from "react";
import styles from "./Popup.module.css";

type PopupProps = {
    hasCloseBtn?: boolean;
    closeFunc?: () => void;
    children: React.ReactNode;
};

function Popup({ hasCloseBtn = false, children, closeFunc = () => {} }: PopupProps) {
    return (
        <section className={styles.background}>
            <section className={styles.container_popup}>
                {hasCloseBtn ? (
                    <button onClick={closeFunc} className={styles.close_btn}>
                        X
                    </button>
                ) : null}
                {children}
            </section>
        </section>
    );
}

export default Popup;

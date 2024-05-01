import React from "react";
import styles from "./Modal.module.css";

type ModalProps = {
    children: React.ReactNode;
    hasCloseBtn?: boolean;
};

function Modal({ children, hasCloseBtn = false }: ModalProps) {
    return (
        <div className={styles.background}>
            {hasCloseBtn ? (
                <button className={styles.close_btn} onClick={() => console.log("close")}>
                    X
                </button>
            ) : null}
            <div className={styles.container}>{children}</div>
        </div>
    );
}

export default Modal;

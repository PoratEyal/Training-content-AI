import React, { useState } from "react";
import styles from "./Popup.module.css";
import BlurEffect from "../../BlurEffect/BlurEffect";

type PopupProps = {
    hasCloseBtn?: boolean;
    closeFunc?: () => void;
    children: React.ReactNode;
};

function Popup({ hasCloseBtn = false, children, closeFunc = () => {} }: PopupProps) {
    return (
        <section className={styles.background}>
            <section className={styles.container_popup}>
                <BlurEffect hasText height="fit-content" maxHeight="70vh">
                    <article className={styles.artical_popup}>
                        {hasCloseBtn ? (
                            <button onClick={closeFunc} className={styles.close_btn}>
                                X
                            </button>
                        ) : null}
                        {children}
                    </article>
                </BlurEffect>
            </section>
        </section>
    );
}

export default Popup;

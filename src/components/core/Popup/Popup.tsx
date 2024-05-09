import React from "react";
import styles from "./Popup.module.css";

type PopupProps = {
    hasCloseBtn?: boolean;
    children: React.ReactNode;
};

function Popup({ hasCloseBtn = false, children }: PopupProps) {
    return (
        <section className={styles.background}>
            <article className={styles.container_popup}>
                {hasCloseBtn ? <button className={styles.close_btn}>X</button> : null}
                {children}
            </article>
        </section>
    );
}

export default Popup;

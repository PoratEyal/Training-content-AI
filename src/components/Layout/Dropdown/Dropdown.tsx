//
// This is a general dropdown component that adapts to the active language and closes on outside clicks
//
import React, { useRef } from "react";
import styles from "./Dropdown.module.css";
import useClickOutside from "../../../hooks/useClickOutside";
import { useLanguage } from "../../../i18n/useLanguage";

type DropdownProps = {
    handleClose: () => void;
    children?: React.ReactNode[];
};

function Dropdown({ handleClose, children }: DropdownProps) {
    const { isRTL } = useLanguage();

    const modalRef = useRef<any>(null);
    useClickOutside(modalRef, () => handleClose());

    return (
        <nav
            ref={modalRef}
            className={
                isRTL ? styles.nav_container : `${styles.nav_container} ${styles.ltr_nav}`
            }
        >
            <ul className={styles.ul}>
                {children.map((option, i) => (
                    <li
                        key={i}
                        className={
                            isRTL
                                ? styles.navbar_option
                                : `${styles.navbar_option} ${styles.ltr_navbar_option}`
                        }
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Dropdown;

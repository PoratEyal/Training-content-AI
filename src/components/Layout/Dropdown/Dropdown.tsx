import React, { useRef } from "react";
import styles from "./Dropdown.module.css";
import useClickOutside from "../../../hooks/useClickOutside";

type DropdownProps = {
    handleClose: () => void;
    children?: React.ReactNode[];
};

function Dropdown({ handleClose, children }: DropdownProps) {
    const modalRef = useRef<any>(null);
    useClickOutside(modalRef, () => handleClose());

    return (
        <nav ref={modalRef} className={styles.nav_container}>
            <ul className={styles.ul}>
                {children.map((option, i) => (
                    <li key={i} className={styles.navbar_option}>
                        {option}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Dropdown;

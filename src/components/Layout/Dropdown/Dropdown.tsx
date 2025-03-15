import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Dropdown.module.css";
import useClickOutside from "../../../hooks/useClickOutside";

type DropdownProps = {
  handleClose: () => void;
  children?: React.ReactNode[];
};

function Dropdown({ handleClose, children }: DropdownProps) {
  const modalRef = useRef<any>(null);
  useClickOutside(modalRef, () => handleClose());

  const { i18n } = useTranslation();
  const isHebrew = i18n.language === "he";

  return (
    <nav
      ref={modalRef}
      className={
        isHebrew
          ? styles.nav_container
          : `${styles.nav_container} ${styles.ltr_nav}`
      }
    >
      <ul className={styles.ul}>
        {children.map((option, i) => (
          <li
            key={i}
            className={
              isHebrew
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

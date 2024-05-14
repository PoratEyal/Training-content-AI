import React from "react";
import styles from "./Dropdown.module.css";
import { DropdownOption } from "../../../models/types/common";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

type DropdownProps = {
    handleClose: () => void;
};

function Dropdown({ handleClose }: DropdownProps) {
    const navigate = useNavigate();
    const { logout } = useAuthContext();
    
    const options: DropdownOption[] = [
        { title: "הפרופיל שלי", path: "/profile", Icon: <FaUser /> },
        { title: "התנתקות", path: "/", func: logout, Icon: <MdLogout /> },
    ];

    const handleClick = (option: DropdownOption) => {
        const { path, func } = option;
        func && func()
        navigate(path);
        handleClose();
    };

    const OptionBtn = (option: DropdownOption) => (
        <li onClick={() => handleClick(option)} className={styles.navbar_option}>
            <span>{option.title}</span>
            <span className={styles.icons}>{option.Icon}</span>
        </li>
    );

    return (
        <nav className={styles.nav_container}>
            <ul className={styles.ul}>
                {options.map((option, i) => (
                    <OptionBtn key={i} {...option} />
                ))}
            </ul>
        </nav>
    );
}

export default Dropdown;

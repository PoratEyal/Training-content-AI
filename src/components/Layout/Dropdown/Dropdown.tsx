import React, { useRef } from "react";
import styles from "./Dropdown.module.css";
import { DropdownOption } from "../../../models/types/common";
import { MdLogout } from "react-icons/md";
// import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { useContentContext } from "../../../context/ContentContext";
import useClickOutside from "../../../hooks/useClickOutside";

type DropdownProps = {
    handleClose: () => void;
};

function Dropdown({ handleClose }: DropdownProps) {
    const navigate = useNavigate();
    const { clearAll } = useContentContext();
    const { logout } = useAuthContext();
    const modalRef = useRef<any>(null);
    useClickOutside(modalRef, () => handleClose());


    const options: DropdownOption[] = [
        // { title: "הפרופיל שלי", path: "/profile", Icon: <FaUser /> },
        {
            title: "התנתקות",
            path: "/home",
            func: async () => {
                await logout();
                clearAll();
            },
            Icon: <MdLogout />,
        },
    ];

    const handleClick = async (option: DropdownOption) => {
        const { path, func } = option;
        func && await func();
        navigate(path);
        handleClose();
    };

    const OptionBtn = (option: DropdownOption) => (
        <li className={styles.navbar_option}>
            <span onClick={() => handleClick(option)}>{option.title}</span>
        </li>
    );

    return (
        <nav ref={modalRef} className={styles.nav_container}>
            <ul className={styles.ul}>
                {options.map((option, i) => (
                    <OptionBtn key={i} {...option} />
                ))}
            </ul>
        </nav>
    );
}

export default Dropdown;

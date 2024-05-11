import React from "react";
import styles from "./Dropdown.module.css";
import { DropdownOption } from "../../../models/types/common";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";

function Dropdown() {
    const options: DropdownOption[] = [
        { title: "הפרופיל שלי", path: "/profile", Icon: <FaUser /> },
        { title: "התנתקות", Icon: <MdLogout /> },
    ];

    const handleClick = (path) => {
        console.log(path);
    };

    const OptionBtn = (option: DropdownOption) => (
        <li onClick={() => handleClick(option.path)} className={styles.navbar_option}>
            {option.Icon}
            <span>{option.title}</span>
        </li>
    );

    return (
        <nav>
            <ul style={{ display: "flex", flexDirection: "column", backgroundColor: "white" }}>
                {options.map((option, i) => (
                    <OptionBtn key={i} {...option} />
                ))}
            </ul>
        </nav>
    );
}

export default Dropdown;

import React from "react";
import { NavOption } from "../../../models/types/common";
import styles from "./Navbar.module.css";
import { MdHome } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { MdArrowForward } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

function Navbar() {
    const options: NavOption[] = [
        { title: "בית", path: "/", Icon: <MdHome /> },
        { title: "עריכת פרטים", path: "/", Icon: <MdCreate /> },
        { title: "יצירת פעילות", path: "/", Icon: <FaPlus /> },
        { title: "היסטוריה", path: "/", Icon: <MdMenuBook /> },
        { title: "חזרה", path: "/", Icon: <MdArrowForward /> },
    ];

    const handleClick = (path) => {
        console.log(path);
    };

    const OptionBtn = (option: NavOption) => (
        <div onClick={() => handleClick(option.path)} className={styles.navbar_option}>
            {option.Icon}
            <span>{option.title}</span>
        </div>
    );

    return (
        <nav className={styles.navbar}>
            {options.map((option, index) => (
                <OptionBtn key={index} {...option} />
            ))}
        </nav>
    );
}

export default Navbar;

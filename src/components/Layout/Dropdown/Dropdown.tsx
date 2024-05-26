import React, { useRef } from "react";
import styles from "./Dropdown.module.css";
import { DropdownOption } from "../../../models/types/common";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { useContentContext } from "../../../context/ContentContext";
import useClickOutside from "../../../hooks/useClickOutside";
import { IoMdShare } from "react-icons/io";
import { IoMailOpen } from "react-icons/io5";
import policy from "../../../models/resources/policy.json";

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
        { 
            title: "הזמינו חברים",
            path: "",
            func: async () => {
                await inviteFriend();
                clearAll();
            },
            Icon: <IoMdShare /> },
        { 
            title: "צרו קשר",
            path: "",
            func: async () => {
                await contactUs();
                clearAll();
            },
            Icon: <IoMailOpen /> },
        {
            title: "התנתקות",
            path: "/",
            func: async () => {
                await logout();
                clearAll();
            },
            Icon: <MdLogout />,
        },
    ];

    const contactUs = async () => {
        const emailLink = document.createElement('a');
        emailLink.href = `mailto:${policy.p9.email}`;
        emailLink.click();
    }

    const inviteFriend = async () => {
        console.log("inviteFriend");
    }

    const handleClick = async (option: DropdownOption) => {
        const { path, func } = option;
        func && await func();
        navigate(path);
        handleClose();
    };

    const OptionBtn = (option: DropdownOption) => (
        <li className={styles.navbar_option}>
            <span className={styles.text_and_icon} onClick={() => handleClick(option)}>{option.title}{option.Icon}</span>
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

import React, { useRef } from "react";
import styles from "./Dropdown.module.css";
import { DropdownOption } from "../../../models/types/common";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { WhatsappShareButton } from "react-share";
import { useAuthContext } from "../../../context/AuthContext";
import { useContentContext } from "../../../context/ContentContext";
import useClickOutside from "../../../hooks/useClickOutside";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { IoMailOpen } from "react-icons/io5";
import policy from "../../../models/resources/policy.json";
import { WEBSITE_URL } from "../../../models/constants";
import { formatInviteFriend } from "../../../utils/format";
import route from "../../../router/route.json";

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
            Icon: <IoMdShare />,
        },
        {
            title: "צרו קשר",
            func: () => contactUs(),
            Icon: <IoMailOpen />,
        },
        {
            title: "תנאי שירות",
            path: route.privacyPolicy,
            Icon: <MdOutlinePrivacyTip />,
        },
        {
            title: "התנתקות",
            path: route.home,
            func: async () => {
                await logout();
                clearAll();
            },
            Icon: <MdLogout />,
        },
    ];

    const contactUs = () => {
        const emailLink = document.createElement("a");
        emailLink.href = `mailto:${policy.p9.email}`;
        emailLink.click();
    };

    const WhatsappOption = (option: DropdownOption) => (
        <li className={styles.navbar_option}>
            <WhatsappShareButton
                className={styles.text_and_icon}
                url={WEBSITE_URL}
                title={formatInviteFriend()}
            >
                {option.title}
                {option.Icon}
            </WhatsappShareButton>
        </li>
    );

    const handleClick = async (option: DropdownOption) => {
        const { path, func } = option;
        func && (await func());
        if (path) navigate(path);
        handleClose();
    };

    const OptionBtn = (option: DropdownOption) => {
        if (option.title === "הזמינו חברים") return WhatsappOption(option);

        return (
            <li className={styles.navbar_option}>
                <span className={styles.text_and_icon} onClick={() => handleClick(option)}>
                    {option.title}
                    {option.Icon}
                </span>
            </li>
        );
    };

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

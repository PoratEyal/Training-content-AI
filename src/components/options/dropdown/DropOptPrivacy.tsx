import React from "react";
import { MdOutlinePrivacyTip } from "react-icons/md";
import styles from "./dropdown.module.css";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";

type DropdownOption = {
    handleClose: () => void;
};

function DropOptPrivacy({ handleClose }: DropdownOption) {
    const navigate = useNavigate();

    const handleClick = async () => {
        navigate(route.privacyPolicy);
        handleClose();
    };

    return (
        <span className={styles.text_and_icon} onClick={() => handleClick()}>
            תנאי שירות
            <MdOutlinePrivacyTip />
        </span>
    );
}

export default DropOptPrivacy;

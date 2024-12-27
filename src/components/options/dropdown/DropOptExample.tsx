import React from "react";
import styles from "./dropdown.module.css";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import { Icons } from "../../Icons";

type DropdownOption = {
    handleClose: () => void;
};

function DropOptExample({ handleClose }: DropdownOption) {
    const navigate = useNavigate();

    const handleClick = async () => {
        navigate(route.content);
        handleClose();
    };

    return (
        <span className={styles.text_and_icon} onClick={() => handleClick()}>
            פעולות מוכנות
            <Icons.output />
        </span>
    );
}

export default DropOptExample;

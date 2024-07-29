import React from "react";
import styles from "./dropdown.module.css";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";
import { VscOutput } from "react-icons/vsc";

type DropdownOption = {
    handleClose: () => void;
};

function DropOptExample({ handleClose }: DropdownOption) {
    const navigate = useNavigate();

    const handleClick = async () => {
        navigate(route.examplesActivities);
        handleClose();
    };

    return (
        <span className={styles.text_and_icon} onClick={() => handleClick()}>
            פעולות לדוגמא
            <VscOutput />
        </span>
    );
}

export default DropOptExample;

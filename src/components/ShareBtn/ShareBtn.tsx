import React, { useState } from "react";
import styles from "./ShareBtn.module.css";
import { AiOutlineLoading } from "react-icons/ai";
import { IconType } from "react-icons";

type ShareBtnProps = {
    Icon: IconType;
    func: () => void;
};

function ShareBtn({ Icon, func }: ShareBtnProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        func();
        setIsLoading(false);
    };

    return (
        <div className={styles.iconBtn}>
            {!isLoading ? <Icon onClick={handleClick} /> : <AiOutlineLoading></AiOutlineLoading>}
        </div>
    );
}

export default ShareBtn;

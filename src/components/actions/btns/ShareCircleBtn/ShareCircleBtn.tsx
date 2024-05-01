import React, { useState } from "react";
import styles from "./ShareCircleBtn.module.css";
import { AiOutlineLoading } from "react-icons/ai";
import { IconType } from "react-icons";

type ShareCircleBtnProps = {
    Icon: IconType;
    func: (path: string, text: string) => void;
    title: string;
    data: string;
};

function ShareCircleBtn({ Icon, func, title, data }: ShareCircleBtnProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        func(title, data);
        setIsLoading(false);
    };

    return (
        <div className={styles.iconBtn}>
            {!isLoading ? <Icon onClick={handleClick} /> : <AiOutlineLoading></AiOutlineLoading>}
        </div>
    );
}

export default ShareCircleBtn;

import React, { useState } from "react";
import styles from "./MagicBtn.module.css";
import SmallLoading from "../Loading/SmallLoading/SmallLoading";
import { FaWandMagicSparkles } from "react-icons/fa6";
import magic from "../../models/resources/magic.json";

type MagicBtnProps = {
    setSubject: (newSubject: string) => void;
    options: any;
    size?: number;
    bottom?: number;
    left?: number;
};

function MagicBtn({ setSubject, options, size = 19, bottom = 7, left = 12 }: MagicBtnProps) {
    const [loadingMagic, setLoadingMagic] = useState(false);

    const generateSubject = async () => {
        setSubject("");
        setLoadingMagic(true);
        setTimeout(() => {
            let activities = options;
            const randomIndex = Math.floor(Math.random() * activities.length);
            setSubject(activities[randomIndex].name);
            setLoadingMagic(false);
        }, 500);
    };

    return (
        <span className={styles.magic_icon} style={{ fontSize: size, left, bottom }}>
            {loadingMagic ? (
                <SmallLoading />
            ) : (
                <FaWandMagicSparkles onClick={() => generateSubject()} />
            )}
        </span>
    );
}

export default MagicBtn;

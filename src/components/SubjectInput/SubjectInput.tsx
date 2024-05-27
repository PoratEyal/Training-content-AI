import React, { useState } from "react";
import styles from "./SubjectInput.module.css";
import SmallLoading from "../Loading/SmallLoading/SmallLoading";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { isInBlackList } from "../../utils/blackList";

type SubjectInputProps = {
    subject: string;
    setSubject: React.Dispatch<React.SetStateAction<string>>;
    setHasAlert: React.Dispatch<React.SetStateAction<boolean>>;
    magic: any[];
};

function SubjectInput({ subject, setSubject, setHasAlert, magic }: SubjectInputProps) {
    const [loadingMagic, setLoadingMagic] = useState(false);

    const handleInputChange = (event) => {
        const newValue = event.target.value as string;
        // Limit the value to 80 characters
        if (newValue.length <= 80) {
            const isBlackListed = isInBlackList(newValue);
            setHasAlert(isBlackListed);
            setSubject(newValue);
        }
    };

    const generateSubject = async () => {
        if (magic && magic.length !== 0) {
            setSubject("");
            setLoadingMagic(true);
            setTimeout(() => {
                let activities = magic;
                const randomIndex = Math.floor(Math.random() * activities.length);
                setSubject(activities[randomIndex].name);
                setLoadingMagic(false);
            }, 500);
        }
    };

    return (
        <div className={styles.input_and_icon}>
            <textarea
                className={styles.input}
                value={subject}
                onChange={handleInputChange}
                placeholder="נושא הפעילות"
            />
            <span className={styles.magic_icon}>
                {magic &&
                    magic.length !== 0 &&
                    (loadingMagic ? (
                        <SmallLoading />
                    ) : (
                        <FaWandMagicSparkles onClick={() => generateSubject()} />
                    ))}
            </span>
        </div>
    );
}

export default SubjectInput;

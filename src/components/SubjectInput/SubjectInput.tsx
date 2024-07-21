import React from "react";
import styles from "./SubjectInput.module.css";
import { isInBlackList } from "../../utils/blackList";
import MagicBtn from "../MagicBtn/MagicBtn";
import magic from "../../models/resources/magic.json";

type SubjectInputProps = {
    placeholder?: string;
    subject: string;
    setSubject: React.Dispatch<React.SetStateAction<string>>;
    setHasAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

function SubjectInput({ placeholder, subject, setSubject, setHasAlert }: SubjectInputProps) {
    const handleInputChange = (event) => {
        const newValue = event.target.value as string;
        // Limit the value to 80 characters
        if (newValue.length <= 80) {
            const isBlackListed = isInBlackList(newValue);
            setHasAlert(isBlackListed);
            setSubject(newValue);
        }
    };

    const changeSubject = (newSubject: string) => {
        setSubject(newSubject);
    }

    return (
        <div className={styles.input_and_icon}>
            <textarea
                content="width=device-width, initial-scale=1.0, user-scalable=no"
                className={styles.input}
                value={subject}
                onChange={handleInputChange}
                placeholder={placeholder || ""}
            />
            <MagicBtn options={magic.contant} setSubject={changeSubject} />
        </div>
    );
}

export default SubjectInput;

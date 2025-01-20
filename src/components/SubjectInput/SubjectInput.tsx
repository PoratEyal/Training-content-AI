import React from "react";
import styles from "./SubjectInput.module.css";
import { isInBlackList } from "../../utils/blackList";
import MagicBtn from "../MagicBtn/MagicBtn";
import magic from "../../models/resources/magic.json";
import { CategoryName } from "../../models/types/movement";

type SubjectInputProps = {
    placeholder?: string;
    subject: string;
    category?: CategoryName;
    setSubject: React.Dispatch<React.SetStateAction<string>>;
    setHasAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

function SubjectInput({
    placeholder,
    subject,
    category,
    setSubject,
    setHasAlert,
}: SubjectInputProps) {
    const handleInputChange = (event) => {
        const newValue = event.target.value as string;
        // Limit the value to 60 characters
        if (newValue.length <= 60) {
            const isBlackListed = isInBlackList(newValue);
            setHasAlert(isBlackListed);
            setSubject(newValue);
        }
    };

    const changeSubject = (newSubject: string) => {
        setSubject(newSubject);
    };

    return (
        <div className={styles.input_and_icon}>
            <textarea
                content="width=device-width, initial-scale=1.0, user-scalable=no"
                className={styles.input}
                value={subject}
                onChange={handleInputChange}
                placeholder={placeholder || ""}
            />
            {magic[category] ? (
                <MagicBtn options={magic[category]} setSubject={changeSubject} />
            ) : null}
        </div>
    );
}

export default SubjectInput;

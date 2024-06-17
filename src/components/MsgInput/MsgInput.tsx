import React from "react";
import styles from "./MsgInput.module.css";

type MsgInputProps = {
    setSubject: React.Dispatch<React.SetStateAction<string>>;
    setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    subject: string;
};

function MsgInput({ setSubject, setIsDisabled, subject }: MsgInputProps) {
    const handleInputChange = (event) => {
        const newValue = event.target.value as string;
        // Limit the value to 300 characters
        if (newValue.length <= 300) setSubject(newValue);
        setIsDisabled(newValue !== "" && newValue.length <= 300 ? false : true);
    };

    return (
        <div className={styles.input_and_icon}>
            <textarea
                content="width=device-width, initial-scale=1.0, user-scalable=no"
                className={styles.input}
                value={subject}
                onChange={handleInputChange}
                placeholder="הודעה"
            />
        </div>
    );
}

export default MsgInput;

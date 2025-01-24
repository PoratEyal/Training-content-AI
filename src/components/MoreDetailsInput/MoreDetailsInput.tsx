import React from "react";
import styles from "./MoreDetailsInput.module.css";

type MoreDetailsInputProps = {
    placeholder?: string;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
};

function MoreDetailsInput({
    placeholder,
    text,
    setText,
}: MoreDetailsInputProps) {
    const handleInputChange = (event) => {
        const newValue = event.target.value as string;
        // Limit the value to 40 characters
        if (newValue.length <= 40) {
            setText(newValue);
        }
    };

    return (
        <div className={styles.input_and_icon}>
            <textarea
                content="width=device-width, initial-scale=1.0, user-scalable=no"
                className={styles.input}
                value={text}
                onChange={handleInputChange}
                placeholder={placeholder || ""}
            />
        </div>
    );
}

export default MoreDetailsInput;

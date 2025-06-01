//
// This is a text input component with a 40-character limit, adjusting its layout for RTL languages
//
import React from "react";
import styles from "./MoreDetailsInput.module.css";
import { useLanguage } from "../../i18n/useLanguage";

type MoreDetailsInputProps = {
    placeholder?: string;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
};

function MoreDetailsInput({ placeholder, text, setText }: MoreDetailsInputProps) {
    const { isRTL } = useLanguage();

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value as string;
        // Limit the value to 40 characters
        if (newValue.length <= 40) {
            setText(newValue);
        }
    };

    return (
        <div
            className={isRTL ? styles.input_and_icon : `${styles.input_and_icon} ${styles.ltr}`}
        >
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

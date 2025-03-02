import React from "react";
import styles from "./MoreDetailsInput.module.css";
import { useTranslation } from "react-i18next";

type MoreDetailsInputProps = {
  placeholder?: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

function MoreDetailsInput({ placeholder, text, setText }: MoreDetailsInputProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value as string;
    // Limit the value to 40 characters
    if (newValue.length <= 40) {
      setText(newValue);
    }
  };

  // 1) Detect language
  const { i18n } = useTranslation();
  const isHebrew = i18n.language === "he"; // or i18n.dir() === "rtl"

  return (
    <div
      // 2) If not Hebrew, add .ltr
      className={
        isHebrew ? styles.input_and_icon : `${styles.input_and_icon} ${styles.ltr}`
      }
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

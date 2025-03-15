import React from "react";
import styles from "./SubjectInput.module.css";
import { isInBlackList } from "../../utils/blackList";
import MagicBtn from "../MagicBtn/MagicBtn";
import MagicEn from "../../models/resources/magicEn.json";
import magic from "../../models/resources/magic.json";
import { CategoryName } from "../../models/types/movement";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();
  const isHebrew = i18n.language === "he";

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= 30) {
      const isBlackListed = isInBlackList(newValue);
      setHasAlert(isBlackListed);
      setSubject(newValue);
    }
  };

  const changeSubject = (newSubject: string) => {
    setSubject(newSubject);
  };

  const magicOptions = isHebrew ? magic[category] : MagicEn[category];

  return (
    <div
      className={
        isHebrew
          ? styles.input_and_icon
          : `${styles.input_and_icon} ${styles.ltr}`
      }
    >
      <textarea
        content="width=device-width, initial-scale=1.0, user-scalable=no"
        className={styles.input}
        value={subject}
        onChange={handleInputChange}
        placeholder={placeholder || ""}
      />

      {magicOptions && (
        <div
          className={isHebrew ? styles.magic_btn_rtl : styles.magic_btn_ltr}
        >
          <MagicBtn options={magicOptions} setSubject={changeSubject} />
        </div>
      )}
    </div>
  );
}

export default SubjectInput;

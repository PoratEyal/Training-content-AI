import React from "react";
import styles from "./SubjectInput.module.css";
import { isInBlackList } from "../../utils/blackList";
import MagicBtn from "../MagicBtn/MagicBtn";
import magicEn from "../../models/resources/en/magic.json";
import magicHe from "../../models/resources/he/magic.json";
import { CategoryName } from "../../models/types/movement";
import { useLanguage } from "../../i18n/useLanguage";

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
  const { isHebrew } = useLanguage();

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

  const magicOptions = isHebrew ? magicHe[category] : magicEn[category];

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

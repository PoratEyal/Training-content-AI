//
// This is a text input component for entering a subject, with a magic button to autofill suggestions
// It adapts the layout to RTL languages and checks for blacklisted words
//
import React from "react";
import styles from "./SubjectInput.module.css";
import { isInBlackList } from "../../utils/blackList";
import MagicBtn from "../MagicBtn/MagicBtn";
import magicEn from "../../models/resources/en/magic.json";
import magicEs from "../../models/resources/es/magic.json";
import magicHe from "../../models/resources/he/magic.json";
import magicAr from "../../models/resources/ar/magic.json";
import { CategoryName } from "../../models/types/movement";
import { useLanguage } from "../../i18n/useLanguage";
import { useNotificationContext } from "../../context/NotificationContext";

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
  const { isRTL, lang } = useLanguage();
  const { t } = useLanguage();
  const { notifySuccess: notifySuccess } = useNotificationContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= 21) {
      const isBlackListed = isInBlackList(newValue, lang);
      setHasAlert(isBlackListed);
      setSubject(newValue);
    }
    else
      notifySuccess(t('buildActivity.subject.limit'));

  };

  const changeSubject = (newSubject: string) => {
    setSubject(newSubject);
  };

  let magicOptions;
  switch (lang) {
    case "he":
      magicOptions = magicHe[category];
      break;
    case "ar":
      magicOptions = magicAr[category];
      break;
    case "es":
      magicOptions = magicEs[category];
      break;
    case "en":
    default:
      magicOptions = magicEn[category];
      break;
  }

  return (
    <div
      className={
        isRTL
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
          className={isRTL ? styles.magic_btn_rtl : styles.magic_btn_ltr}
        >
          <MagicBtn options={magicOptions} setSubject={changeSubject} />
        </div>
      )}
    </div>
  );
}

export default SubjectInput;

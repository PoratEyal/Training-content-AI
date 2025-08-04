import React, { useRef } from "react";
import styles from "./EventInput.module.css";
import { useLanguage } from "../../../i18n/useLanguage";
import { useNotificationContext } from "../../../context/NotificationContext";

type EventInputProps = {
  placeholder?: string;
  event: string;
  setEvent: React.Dispatch<React.SetStateAction<string>>;
  setHasAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

function EventInput({
  placeholder,
  event,
  setEvent,
  setHasAlert,
}: EventInputProps) {
  const { isRTL, lang, t } = useLanguage();
  const { notifySuccess } = useNotificationContext();
  const hasShownLimitMessage = useRef(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 21) {
      setEvent(newValue);
      hasShownLimitMessage.current = false;
    } else if (!hasShownLimitMessage.current) {
      notifySuccess(t("eventDetails.limit"), { container: "top-center" });
      hasShownLimitMessage.current = true;
    }
  };

  return (
    <div
      className={
        isRTL ? styles.input_and_icon : `${styles.input_and_icon} ${styles.ltr}`
      }
    >
      <textarea
        className={styles.input}
        value={event}
        onChange={handleInputChange}
        placeholder={placeholder || ""}
      />
    </div>
  );
}

export default EventInput;

//
// This component shows a popup for user reviews or ideas
// It collects user feedback and sends it by email using EmailJS
// It adjusts the layout based on the active language (like left-to-right or right-to-left)
//
import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { getAuth } from "firebase/auth";
import styles from "./PopupFeedback.module.css";
import SmallLoading from "../Loading/SmallLoading/SmallLoading";
import { Icons } from "../Icons";
import { useAuthContext } from "../../context/AuthContext";
import { useLanguage } from "../../i18n/useLanguage";
import { fetchUpdateIsMsg } from "../../utils/fetch";
import { logEvent } from "../../utils/logEvent";

type ReviewPopupProps = {
  msg: string;
  handleClose: () => Promise<void>;
};

const ReviewPopup: React.FC<ReviewPopupProps> = ({ msg, handleClose }) => {
  const { t, dir } = useLanguage();

  const [textInput, setTextInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const { currentUser } = useAuthContext();

  // initialise EmailJS once
  useEffect(() => {
    emailjs.init("ZWKebkgRROVgM8nEV");
  }, []);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!currentUser?.id) return;

    setIsLoading(true);
    await handleClose();

    try {
      const templateParams = {
        user_response: textInput,
        user_email: currentUser.email || "No email provided",
      };

      await emailjs.send(
        "service_p5bim93",
        "template_diemfva",
        templateParams,
        "ZWKebkgRROVgM8nEV"
      );

      await fetchUpdateIsMsg(currentUser.id);

    } catch (error) {
      const auth = getAuth();
      const user = auth.currentUser;
      const userEmail = user?.email || "guest";
      logEvent(`[PopupFeedback]: Error sending feedback email: ${error?.toString?.() || "unknown error"}`, userEmail);
    }
    finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !textInput.trim();

  return (
    <div className={`${styles.popupOverlay} ${dir === "ltr" ? styles.ltr : ""}`}>

      <div
        className={`${styles.popupContent} ${showPopup ? styles.popupContentShow : ""
          }`}
      >
        <button className={styles.closeButton} onClick={handleClose}>
          <Icons.cancel />
        </button>

        <div className={styles.popupTitle_div}>
          <h3 className={styles.popupTitle}>{t("reviewPopup.title")}</h3>
          <Icons.idea className={styles.icon_lamp} />
        </div>

        <div className={styles.text}>{msg}</div>

        <form className={styles.popupForm}>
          <div className={styles.popupText}>
            <div className={styles.text}>{t("reviewPopup.shareIdea")}</div>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className={styles.otherInput}
              placeholder={t("reviewPopup.placeholder")}
            />
          </div>
        </form>

        <div className={styles.btn_div}>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`${styles.submitButton} ${isDisabled ? styles.submitButtonDisabled : ""
              }`}
            style={{ height: 40 }}
          >
            {isLoading ? (
              <div className={styles.btnLoading}>
                <SmallLoading />
              </div>
            ) : (
              <div className={styles.buttonContent}>
                <span
                  className={styles.buttonText}
                  style={{ opacity: isDisabled ? 0.5 : 1 }}
                >
                  {t("reviewPopup.submit")}
                </span>
                <div
                  className={styles.buttonIcon}
                  style={{ opacity: isDisabled ? 0.5 : 1 }}
                >
                  <Icons.chevronsLeft className={styles.icon} />
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;

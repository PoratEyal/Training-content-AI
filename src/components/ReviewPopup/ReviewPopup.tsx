import React, { useState, useEffect } from "react";
import styles from "./ReviewPopup.module.css";
import emailjs from 'emailjs-com';
import SmallLoading from "../Loading/SmallLoading/SmallLoading";
import { useAuthContext } from "../../context/AuthContext";
import { Icons } from "../Icons";
import { MsgType } from "../../models/types/common";
import { fetchUpdateIsMsg } from "../../utils/fetch";

type ReviewPopupProps = {
  msg: string;
  handleClose: () => Promise<void>;
}

const ReviewPopup: React.FC<ReviewPopupProps> = ({ msg, handleClose }) => {
  const [textInput, setTextInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // Access the current user information from AuthContext
  const { currentUser } = useAuthContext();

  emailjs.init('ZWKebkgRROVgM8nEV');

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(!currentUser || !currentUser.id) return;
  
    setIsLoading(true);

    try {
      // Send email using EmailJS
      const templateParams = {
        user_response: textInput,
        user_email: currentUser.email || "No email provided",
      };

      await emailjs.send(
        'service_p5bim93',   // EmailJS Service ID
        'template_diemfva',  // EmailJS Template ID
        templateParams,
        'ZWKebkgRROVgM8nEV'  // EmailJS User ID
      );

      await fetchUpdateIsMsg(currentUser.id);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  const isDisabled = !textInput.trim();

  return (
    <div className={styles.popupOverlay}>
      <div className={`${styles.popupContent} ${showPopup ? styles.popupContentShow : ""}`}>
        <button className={styles.closeButton} onClick={handleClose}>
          <Icons.cancel />
        </button>

        <div className={styles.popupTitle_div}>
          <h3 className={styles.popupTitle}>בקשתם? קבלתם!</h3>
          <Icons.idea className={styles.icon_lamp}/>
        </div>

        <div className={styles.text}>
          {msg}
        </div>

        <form className={styles.popupForm}>
          <div className={styles.popupText}>
            <div className={styles.text}>יש לכם רעיון לשיפור? או סתם משהו לשתף?</div>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className={styles.otherInput}
              placeholder="אנא כתבו לנו פה"
            />
          </div>
        </form>

        <div className={styles.btn_div}>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`${styles.submitButton} ${isDisabled ? styles.submitButtonDisabled : ""}`}
            style={{ height: 40 }}
          >
            {isLoading ? (
              <div className={styles.btnLoading}>
                <SmallLoading />
              </div>
            ) : (
              <div className={styles.buttonContent}>
                <span className={styles.buttonText} style={{ opacity: isDisabled ? 0.5 : 1 }}>
                  שליחה
                </span>
                <div className={styles.buttonIcon} style={{ opacity: isDisabled ? 0.5 : 1 }}>
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

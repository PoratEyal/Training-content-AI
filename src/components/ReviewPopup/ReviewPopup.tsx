import React, { useState, useEffect } from "react";
import styles from "./ReviewPopup.module.css";
import { FiChevronsLeft } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import emailjs from 'emailjs-com';
import SmallLoading from "../Loading/SmallLoading/SmallLoading";
import { FcIdea } from "react-icons/fc";
import { useAuthContext } from "../../context/AuthContext";

interface PopupComponentProps {
  onClose: (userResponse?: string) => void;
}

const PopupComponent: React.FC<PopupComponentProps> = ({ onClose }) => {
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
    setIsLoading(true);

    try {
      // Send email using EmailJS
      const templateParams = {
        user_response: textInput,
        user_email: currentUser?.email || "No email provided",
      };

      await emailjs.send(
        'service_p5bim93',   // EmailJS Service ID
        'template_diemfva',  // EmailJS Template ID
        templateParams,
        'ZWKebkgRROVgM8nEV'  // EmailJS User ID
      );

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsLoading(false);
      onClose(textInput);
    }
  };

  const isDisabled = !textInput.trim();

  return (
    <div className={styles.popupOverlay}>
      <div className={`${styles.popupContent} ${showPopup ? styles.popupContentShow : ""}`}>
        <button className={styles.closeButton} onClick={() => onClose()}>
          <MdOutlineCancel />
        </button>

        <div className={styles.popupTitle_div}>
          <h3 className={styles.popupTitle}>רגע! אל תסגרו אותי</h3>
          <FcIdea className={styles.icon_lamp}></FcIdea>
        </div>

        <div className={styles.text}>
          מה חדש? הוספנו יכולת חדשה לשמירת פעולות שיצרתם באזור אישי 🔖
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
                  <FiChevronsLeft className={styles.icon} />
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;

import React, { useState, useEffect } from "react";
import styles from "./ReviewPopup.module.css";
import { FiChevronsLeft } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import emailjs from 'emailjs-com';
import SmallLoading from "../Loading/SmallLoading/SmallLoading";

interface PopupComponentProps {
  onClose: (selectedOption?: string) => void;
}

const PopupComponent: React.FC<PopupComponentProps> = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [otherText, setOtherText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  emailjs.init('ZWKebkgRROVgM8nEV');

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    // Determine the final selection
    let finalSelection = selectedOption;
    if (selectedOption === 'option3') {
      finalSelection = otherText;
    }
  
    try {
      // Send email using EmailJS
      const templateParams = {
        user_response: finalSelection,
      };
  
      await emailjs.send(
        'service_p5bim93',   // EmailJS Service ID
        'template_diemfva',  // EmailJS Template ID
        templateParams,
        'ZWKebkgRROVgM8nEV'       // EmailJS User ID
      );
  
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsLoading(false);
      onClose(finalSelection);
    }
  };  

  // Disable the submit button if no option is selected, or if 'Other' is selected but the text input is empty
  const isDisabled = !selectedOption || (selectedOption === "option3" && !otherText);

  return (
    <div className={styles.popupOverlay}>
      <div
        className={`${styles.popupContent} ${showPopup ? styles.popupContentShow : ""}`}
      >
        <button className={styles.closeButton} onClick={() => onClose()}>
          <MdOutlineCancel />
        </button>

        <h2 className={styles.popupTitle}>מה הכי חשוב לכם שנוסיף בגרסאות הבאות?</h2>

        <form className={styles.popupForm}>
          <div className={styles.popupText}>
            <label>
              <input
                type="radio"
                value="שמירת הפעולות שיצרתם"
                checked={selectedOption === "שמירת הפעולות שיצרתם"}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  setOtherText("");
                }}
              />
              שמירת הפעולות שיצרתם
            </label>
          </div>
          <div className={styles.popupText}>
            <label>
              <input
                type="radio"
                value="הוספת פעולות ומשחקים מוכנים מראש"
                checked={selectedOption === "הוספת פעולות ומשחקים מוכנים מראש"}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  setOtherText("");
                }}
              />
              הוספת פעולות ומשחקים מוכנים מראש
            </label>
          </div>
          <div className={styles.popupText}>
            <label>
              <input
                type="radio"
                value="option3"
                checked={selectedOption === "option3"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              אחר. אנא כתבו לנו בתיבת הטקסט
            </label>
            {selectedOption === "option3" && (
              <textarea
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                className={styles.otherInput}
              />
            )}
          </div>
        </form>

        <div className={styles.btn_div}>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`${styles.submitButton} ${
              isDisabled ? styles.submitButtonDisabled : ""
            }`}
            style={{ height: 40 }}
          >
            {isLoading ? (
              <div className={styles.btnLoading}>
                <SmallLoading></SmallLoading>
              </div>
            ) : (
              <div className={styles.buttonContent}>
                <span className={styles.buttonText} style={{ opacity: isDisabled ? 0.5 : 1 }}>
                  שליחה
                </span>
                <div
                  className={styles.buttonIcon}
                  style={{ opacity: isDisabled ? 0.5 : 1 }}
                >
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

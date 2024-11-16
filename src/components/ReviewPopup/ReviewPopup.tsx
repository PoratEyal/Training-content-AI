import React, { useState } from "react";
import styles from "./ReviewPopup.module.css";
import { FiChevronsLeft } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

interface PopupComponentProps {
  onClose: (selectedOption?: string) => void;
}

const PopupComponent: React.FC<PopupComponentProps> = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [otherText, setOtherText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Determine the final selection
    let finalSelection = selectedOption;
    if (selectedOption === "option3") {
      finalSelection = otherText;
    }

    onClose(finalSelection);
    setIsLoading(false);
  };

  // Disable the submit button if no option is selected, or if 'Other' is selected but the text input is empty
  const isDisabled = !selectedOption || (selectedOption === "option3" && !otherText);

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={() => onClose()}>
          <MdOutlineCancel />
        </button>

        <h2 className={styles.popupTitle}>מה הכי חשוב לכם שנוסיף בגרסאות הבאות?</h2>

        <form className={styles.popupForm}>
          <div className={styles.popupText}>
            <label>
              <input
                type="radio"
                value="option1"
                checked={selectedOption === "option1"}
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
                value="option2"
                checked={selectedOption === "option2"}
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
              <input
                type="text"
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
                {/* Include a loading spinner if desired */}
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

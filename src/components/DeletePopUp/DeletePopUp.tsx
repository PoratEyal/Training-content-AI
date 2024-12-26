import React, { useEffect, useState } from "react";
import styles from "./DeletePopUp.module.css";
import { VscLoading } from "react-icons/vsc";

interface DeletePopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  activityName: string;
}

const DeletePopUp: React.FC<DeletePopUpProps> = ({ isOpen, onClose, onDelete, activityName }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowPopup(true);
    } else {
      setShowPopup(false); // Reset animation state when popup closes
    }
  }, [isOpen]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } catch (error) {
      console.error("Error during delete:", error);
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={`${styles.popupContent} ${showPopup ? styles.popupContentShow : ""}`}>
        <div className={styles.popupTitle_div}>
          <h3 className={styles.popupTitle}>מחיקת הפעולה</h3>
        </div>
        <p className={styles.message}>
          האם למחוק את הפעולה {activityName}?
        </p>
        <div className={styles.btn_div}>
          <button
            className={styles.deleteButton}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? <VscLoading className={styles.loading}/> : "מחיקה"}
          </button>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isDeleting}
          >
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;

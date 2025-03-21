import React, { useEffect, useState } from "react";
import styles from "./DeletePopUp.module.css";
import { Icons } from "../Icons";
import { MdDelete } from "react-icons/md";
import { useErrorContext } from "../../context/ErrorContext";
import { useTranslation } from "react-i18next";

type DeletePopUpProps = {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => Promise<void>;
    activityName: string;
};

const DeletePopUp: React.FC<DeletePopUpProps> = ({ isOpen, onClose, onDelete, activityName }) => {
    const { handleError } = useErrorContext();
    const [showPopup, setShowPopup] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (isOpen) {
            setShowPopup(true);
        } else {
            setShowPopup(false);
        }
    }, [isOpen]);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            setIsDeleting(false);
            onClose();
            await onDelete();
        } catch (error) {
            handleError(t("savedActivities.deletePopup.deleteError"));
            setIsDeleting(false);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.popupOverlay}>
            <div className={`${styles.popupContent} ${showPopup ? styles.popupContentShow : ""}`}>
                <button
                    className={`${styles.closeButton} ${
                        i18n.language === "en" ? styles.closeButtonLtr : styles.closeButtonRtl
                    }`}
                    onClick={onClose}
                >
                    <Icons.cancel />
                </button>
                <div className={styles.popupTitle_div}>
                    <h3 className={styles.popupTitle}>
                    {t("savedActivities.deletePopup.title")}
                    </h3>
                    <MdDelete className={styles.deleteIcon} />
                </div>
                <p className={styles.message}>
                    {t("savedActivities.deletePopup.message", { activityName })} 
                </p>
                <button
                    className={styles.deleteButton}
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    {isDeleting ? (
                        <Icons.loading className={styles.loading} />
                    ) : (
                        t("savedActivities.deletePopup.deleteButton")
                    )}
                </button>
            </div>
        </div>
    );
};

export default DeletePopUp;

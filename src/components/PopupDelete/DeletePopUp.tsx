import React, { useEffect, useState } from "react";
import styles from "./DeletePopUp.module.css";
import { Icons } from "../Icons";
import { useNotificationContext } from "../../context/NotificationContext";
import { useLanguage } from "../../i18n/useLanguage";

type DeletePopUpProps = {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => Promise<void>;
    activityName: string;
};

const DeletePopUp: React.FC<DeletePopUpProps> = ({ isOpen, onClose, onDelete, activityName }) => {
    const { t, dir } = useLanguage();
    const { notifyAlert: notifyAlert } = useNotificationContext();
    const [showPopup, setShowPopup] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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
            notifyAlert(t("savedActivities.deletePopup.deleteError"));
            setIsDeleting(false);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.popupOverlay}>
            <div className={`${styles.popupContent} ${showPopup ? styles.popupContentShow : ""}`}>
                <button
                    className={`${styles.closeButton} ${dir === "ltr" ? styles.closeButtonLtr : styles.closeButtonRtl
                        }`}
                    onClick={onClose}
                >
                    <Icons.cancel />
                </button>
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

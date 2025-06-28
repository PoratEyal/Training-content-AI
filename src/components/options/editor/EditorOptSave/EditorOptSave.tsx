import React, { useState } from "react";
import styles from "./EditorOptSave.module.css";
import { Activity } from "../../../../models/types/activity";
import { SAVE_COOLDOWN } from "../../../../models/constants/time";
import { convertHTMLToContent } from "../../../../utils/format";
import { updateActivityWithContent } from "../../../../utils/activity";
import { fetchSaveActivity } from "../../../../utils/fetch";
import { useNotificationContext } from "../../../../context/NotificationContext";
import { useContentContext } from "../../../../context/ContentContext";
import { useSaveContext } from "../../../../context/SavedContext";
import { useLanguage } from "../../../../i18n/useLanguage";

type EditorOptSaveProps = {
    activity: Activity;
    htmlContent?: string;
};

const EditorOptSave: React.FC<EditorOptSaveProps> = ({ activity, htmlContent }) => {
    const { t, dir, lang } = useLanguage();
    const { updateMainActivity } = useContentContext();
    const { notifySuccess: handleSuccess, notifyAlert: notifyAlert } = useNotificationContext();
    const { getSavedActivities } = useSaveContext();
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);

    const handleSave = async () => {
        if (htmlContent && !isDisabled) {
            try {
                setIsDisabled(true);
                setTimeout(() => {
                    // prevent DDoS attacks
                    setIsDisabled(false);
                }, SAVE_COOLDOWN);
                handleSuccess(t("editor.save.saveSuccess"));
                setSaved(true);
                const convertedContent = convertHTMLToContent(htmlContent);
                const newUpdatedActivity = updateActivityWithContent(activity, convertedContent);
                const res = await fetchSaveActivity(newUpdatedActivity, lang);
                updateMainActivity({ ...newUpdatedActivity, id: res.activity.id } as Activity);
                await getSavedActivities();
                setTimeout(() => {
                    setSaved(false);
                }, 1000);
            } catch (error) {
                notifyAlert(t("editor.save.saveError"));
                setSaved(false);
            }
        }
    };

    return (
        <div
            className={`${styles.bookmark} ${saved ? styles.checked : ""} ${dir === "rtl" ? styles.rtl : styles.ltr}`}
            onClick={isDisabled || !htmlContent ? undefined : handleSave}
            aria-pressed={saved}
            role="button"
        >
            <svg
                className={styles.svgIcon}
                viewBox="0 0 50 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M46 62.0085L46 3.88139L3.99609 3.88139L3.99609 62.0085L24.5 45.5L46 62.0085Z" />
            </svg>
            <span className={styles.text}>
                {saved ? t("editor.save.savedToMyActivities") : t("editor.save.saveToMyActivities")}
            </span>
        </div>
    );
};

export default EditorOptSave;

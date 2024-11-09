import React from "react";
import styles from "./GenerateBtn.module.css";
import { fetchGetActivity } from "../../utils/fetch";
import { LuRefreshCcw } from "react-icons/lu";
import { useContentContext } from "../../context/ContentContext";
import { useErrorContext } from "../../context/ErrorContext";
import msg from "../../models/resources/errorMsg.json";
import { Activity } from "../../models/types/activity";

type MoreActionsProps = {
    activity: Activity;
    setLoadingGenerate: React.Dispatch<React.SetStateAction<boolean>>;
    setNewActivity: React.Dispatch<React.SetStateAction<boolean>>;
};

const GenerateBtn: React.FC<MoreActionsProps> = ({
    activity,
    setLoadingGenerate,
    setNewActivity,
}) => {
    const { updateMainActivity } = useContentContext();
    const { handleAlert } = useErrorContext();

    const { activity: text, ...detailsData } = activity;

    const generateAgain = async () => {
        setLoadingGenerate(true);
        try {
            const response = await fetchGetActivity({ ...detailsData });
            if (
                (response.result === "success" || response.result === "safety") &&
                response.activity
            ) {
                updateMainActivity(response.activity);
            }
        } catch (error) {
            handleAlert(msg.error.message);
        } finally {
            setLoadingGenerate(false);
            setNewActivity(true);
        }
    };

    return (
        <button onClick={generateAgain} className={styles.button}>
            <LuRefreshCcw />
        </button>
    );
};

export default GenerateBtn;

import React from "react";
import styles from "./GenerateBtn.module.css";
import { LuRefreshCcw } from "react-icons/lu";
import { Activity } from "../../models/types/activity";
import { useContentContext } from "../../context/ContentContext";
import { useErrorContext } from "../../context/ErrorContext";
import { fetchGetActivity } from "../../utils/fetch";
import msg from "../../models/resources/errorMsg.json";

type MoreActionsProps = {
    setLoadingGenerate: React.Dispatch<React.SetStateAction<boolean>>;
    setNewActivity: React.Dispatch<React.SetStateAction<boolean>>;
    activity: Activity;
};

const GenerateBtn: React.FC<MoreActionsProps> = ({
    setLoadingGenerate,
    setNewActivity,
    activity,
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

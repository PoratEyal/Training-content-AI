import React, { useState } from "react";
import styles from "./GenerateBtn.module.css";
import { fetchGetActivity } from "../../utils/fetch";
import { LuRefreshCcw } from "react-icons/lu";
import { useContentContext } from "../../context/ContentContext";
import { useErrorContext } from "../../context/ErrorContext";
import msg from "../../models/resources/errorMsg.json";
import { Activity } from "../../models/types/activity";
import SmallLoading from "../Loading/SmallLoading/SmallLoading";

type MoreActionsProps = {
    activity: Activity;
    setNewActivity: React.Dispatch<React.SetStateAction<boolean>>;
};

const GenerateBtn: React.FC<MoreActionsProps> = ({ activity, setNewActivity }) => {
    const { updateMainActivity } = useContentContext();
    const { handleAlert } = useErrorContext();
    const [loadingGenerate, setLoadingGenerate] = useState(false);

    const { activity: text, ...detailsData } = activity;

    const generateAgain = async () => {
        if (loadingGenerate) return;

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
            {loadingGenerate ? <SmallLoading /> : <LuRefreshCcw />}
        </button>
    );
};

export default GenerateBtn;

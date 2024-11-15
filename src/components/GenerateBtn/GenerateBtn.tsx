import React from "react";
import styles from "./GenerateBtn.module.css";
import { LuRefreshCcw } from "react-icons/lu";
import { Activity } from "../../models/types/activity";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";

type MoreActionsProps = {
    activity: Activity;
};

const GenerateBtn: React.FC<MoreActionsProps> = ({
    activity,
}) => {
    const navigate = useNavigate();

    const { activity: text, ...detailsData } = activity;

    const generateAgain = async () => {
        const { category, subject, place, time } = detailsData;
        navigate(`${route.generate}?c=${category}&s=${subject}&p=${place}&t=${time}`);
    };

    return (
        <button onClick={generateAgain} className={styles.button}>
            <LuRefreshCcw />
        </button>
    );
};

export default GenerateBtn;

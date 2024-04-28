import React, { useState } from "react";
import styles from "./activityOutput.module.css";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { BsFiletypeDocx } from "react-icons/bs";
import { useContentContext } from "../../context/ContentContext";
import { importDocx, importWhatsUp } from "../../utils/import";
import { useErrorContext } from "../../context/ErrorContext";
import {
    getContentActivity,
    getMoreContent,
    getPlayingTime,
    getPointOfView,
    getScoutingTime,
} from "../../service/openAiPrompts";
import { ActivityType, DataType } from "../../models/types/context";

type ActivityOutputProps = {
    index: number;
    title: string;
    path: ActivityType;
    contextData: DataType;
};

function ActivityOutput({ index, title, path, contextData }: ActivityOutputProps) {
    const [iconClickedPoint, setIconClickedPoint] = useState(false);
    const [moreDataPoint, setMoreDataPoint] = useState(false);
    const [whatsupPoint, setWhatsupPoint] = useState(false);
    const [docsPoint, setDocsPoint] = useState(false);

    const {
        updateLimit,
        updatePointOfView,
        updateContentActivity,
        updateScoutingTime,
        updatePlayingTime,
    } = useContentContext();
    const { handleError } = useErrorContext();
    const { data, subject, time } = path;

    const importWhatsup = () => {
        setWhatsupPoint(true);
        importWhatsUp(title, data);
        setWhatsupPoint(false);
    };

    const importDocs = async () => {
        setDocsPoint(true);
        importDocx(title, data);
        setDocsPoint(false);
    };

    // Function to format the activity text with line breaks
    const formatTextWithLineBreaks = (text) => {
        return text.split("\n").map((line, index, array) => (
            <React.Fragment key={index}>
                {line}
                {index !== array.length - 1 && <br />}
            </React.Fragment>
        ));
    };

    const generateAgain = async () => {
        try {
            setIconClickedPoint(true);
            const { amount, grade, gender, place } = contextData;
            let result;
            if (index === 1) {
                result = await getPointOfView(subject, time, amount, grade, gender, place);
            } else if (index === 2) {
                result = await getContentActivity(subject, time, amount, grade, gender, place);
            } else if (index === 3) {
                result = await getScoutingTime(subject, time, amount, grade, gender, place);
            } else {
                result = await getPlayingTime(subject, time, amount, grade, gender, place);
            }
            updatePointOfView(subject, time, result);
            updateLimit();
        } catch (error) {
            handleError(error);
        } finally {
            setIconClickedPoint(false);
        }
    };

    const moreData = async () => {
        try {
            setMoreDataPoint(true);
            const result = await getMoreContent(data);
            if (index === 1) {
                updatePointOfView(subject, time, result);
            } else if (index === 2) {
                updateContentActivity(subject, time, result);
            } else if (index === 3) {
                updateScoutingTime(subject, time, result);
            } else {
                updatePlayingTime(subject, time, result);
            }
            updateLimit();
        } catch (error) {
            handleError(error);
        } finally {
            setMoreDataPoint(false);
        }
    };

    return (
        <div className={styles.activity_div}>
            <div className={styles.h2_icon_div}>
                <h2 className={styles.h2_activity}>{title}</h2>
                <div className={styles.icons}>
                    {!whatsupPoint ? (
                        <FaWhatsapp onClick={importWhatsup}></FaWhatsapp>
                    ) : (
                        <AiOutlineLoading></AiOutlineLoading>
                    )}
                    {!docsPoint ? (
                        <BsFiletypeDocx onClick={importDocs}></BsFiletypeDocx>
                    ) : (
                        <AiOutlineLoading></AiOutlineLoading>
                    )}
                </div>
            </div>
            {formatTextWithLineBreaks(data)}
            <div className={styles.buttons_div}>
                <button onClick={generateAgain} className={styles.button}>
                    <label>פעילות נוספת</label>
                    {!iconClickedPoint ? (
                        <img className={styles.icon_svg} src="ai.svg"></img>
                    ) : (
                        <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>
                    )}
                </button>
                <button onClick={moreData} className={styles.button}>
                    <label>הרחבת התוכן</label>
                    {!moreDataPoint ? (
                        <img className={styles.icon_svg} src="more.svg"></img>
                    ) : (
                        <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>
                    )}
                </button>
            </div>
        </div>
    );
}

export default ActivityOutput;

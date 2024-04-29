import React, { useState } from "react";
import styles from "./ActivityOutput.module.css";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { BsFiletypeDocx } from "react-icons/bs";
import { useContentContext } from "../../context/ContentContext";
import { importDocx, importWhatsUp } from "../../utils/import";
import { useErrorContext } from "../../context/ErrorContext";
import { ActivityType, DataType } from "../../models/types/context";
import { PathActivity } from "../../models/constants/path";
import { buildActivityFromAI } from "../../service/buildActivity";
import { PROMPT_LIMIT } from "../../models/constants/state";
import { getContentActivity, getPlayingTime, getPointOfView, getScoutingTime } from "../../service/geminiPrompts";


type ActivityOutputProps = {
    index: number;
    title: string;
    path: ActivityType;
    contextData: DataType;
};

function ActivityOutput({ index, title, path, contextData }: ActivityOutputProps) {
    const [iconClickedPoint, setIconClickedPoint] = useState(false);
    const [whatsupPoint, setWhatsupPoint] = useState(false);
    const [docsPoint, setDocsPoint] = useState(false);

    const {
        limit,
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
        updateLimit();
        if (!limit || limit < PROMPT_LIMIT-1) {
            setIconClickedPoint(true);
            const { amount, grade, gender, place } = contextData;

            if (index === 1) {
                buildActivityFromAI(
                    getPointOfView,
                    PathActivity.pointOfView.path,
                    subject,
                    time,
                    amount,
                    grade,
                    gender,
                    place,
                )
                    .then((result) => updatePointOfView(subject, time, result))
                    .catch((error) => handleError(error))
                    .finally(() => setIconClickedPoint(false));
            } else if (index === 2) {
                buildActivityFromAI(
                    getContentActivity,
                    PathActivity.contentActivity.path,
                    subject,
                    time,
                    amount,
                    grade,
                    gender,
                    place,
                )
                    .then((result) => updateContentActivity(subject, time, result))
                    .catch((error) => handleError(error))
                    .finally(() => setIconClickedPoint(false));
            } else if (index === 3) {
                buildActivityFromAI(
                    getScoutingTime,
                    PathActivity.scoutingTime.path,
                    subject,
                    time,
                    amount,
                    grade,
                    gender,
                    place,
                )
                    .then((result) => updateScoutingTime(subject, time, result))
                    .catch((error) => handleError(error))
                    .finally(() => setIconClickedPoint(false));
            } else {
                buildActivityFromAI(
                    getPlayingTime,
                    PathActivity.playingTime.path,
                    subject,
                    time,
                    amount,
                    grade,
                    gender,
                    place,
                )
                    .then((result) => updatePlayingTime(subject, time, result))
                    .catch((error) => handleError(error))
                    .finally(() => setIconClickedPoint(false));
            }
        }
    };

    return (
        <div className={styles.activity_div}>
            <div className={styles.h2_icon_div}>
                <h2 className={styles.h2_activity}>{title}</h2>
                <div className={styles.button_and_icons_div}>
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
                    <button onClick={generateAgain} className={styles.button}>
                        {!iconClickedPoint ? (
                            <div className={styles.btn_content_div}>
                                <label>פעילות אחרת</label>
                                {/* <img className={styles.icon_svg} src="ai.svg"></img> */}
                            </div>
                        ) : (
                            <div className={styles.btn_content_div}>
                                {/* <label>הפעילות בהכנה</label> */}
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>
                            </div>
                        )}
                    </button>
                </div>
            </div>
            {formatTextWithLineBreaks(data)}
        </div>
    );
}

export default ActivityOutput;

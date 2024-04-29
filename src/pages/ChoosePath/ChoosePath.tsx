import React, { useEffect, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import styles from "./ChoosePath.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/loading";
import Path from "../../components/Path/Path";
import { useErrorContext } from "../../context/ErrorContext";
import { buildActivity } from "../../service/buildActivity";
import { IoArrowForward } from "react-icons/io5";
import {
    getContentActivity,
    getPlayingTime,
    getPointOfView,
    getScoutingTime,
} from "../../service/openAiPrompts";
import { PathActivity } from "../../models/constants/path";
import hints from "../../models/resources/hints.json"
import { PROMPT_LIMIT } from "../../models/constants/state";

function ChoosePath() {
    const {
        data,
        limit,
        updateLimit,
        updatePointOfView,
        updateContentActivity,
        updateScoutingTime,
        updatePlayingTime,
        resetAllUseFields,
    } = useContentContext();
    const { handleError } = useErrorContext();

    const [clicked, setClicked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();

    const [pointOfView, setPointOfView] = useState(undefined);
    const [contentActivity, setContentActivity] = useState(undefined);
    const [scoutingTime, setScoutingTime] = useState(undefined);
    const [playingTime, setPlayingTime] = useState(undefined);

    useEffect(() => {
        setIsDisabled(pointOfView || contentActivity || scoutingTime || playingTime ? false : true);
    }, [pointOfView, contentActivity, scoutingTime, playingTime]);

    const submitHandler = async () => {
        updateLimit();
        if (!limit || limit < PROMPT_LIMIT-1) {
            setClicked(true);
            const promises = [];
            const { amount, grade, gender, place } = data;

            if (pointOfView) {
                const { subject, time } = pointOfView;
                promises.push(
                    buildActivity(
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
                        .catch((error) => handleError(error)),
                );
            }

            if (contentActivity) {
                const { subject, time } = contentActivity;
                promises.push(
                    buildActivity(
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
                        .catch((error) => handleError(error)),
                );
            }

            if (scoutingTime) {
                const { subject, time } = scoutingTime;
                promises.push(
                    buildActivity(
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
                        .catch((error) => handleError(error)),
                );
            }

            if (playingTime) {
                const { subject, time } = playingTime;
                promises.push(
                    buildActivity(
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
                        .catch((error) => handleError(error)),
                );
            }

            await Promise.allSettled(promises);
            navigate("/activity");
        }
    };

    const goBack = () => {
        resetAllUseFields();
        navigate("/");
    };

    return (
        <React.Fragment>
            <div className={!clicked ? styles.container : styles.container_disabled}>
                <div className={styles.checkbox_container}>
                    <div className={styles.navbar}>
                        <IoArrowForward
                            onClick={goBack}
                            className={styles.back_icon}
                        ></IoArrowForward>
                    </div>

                    <h3 className={styles.h3}>בחרו את הפעילות שלכם</h3>

                    <Path index={1} title="נקודת מבט" hint={hints.pointOfView} setPath={setPointOfView} />
                    <Path index={2} title="פעילות תוכן" hint={hints.contentActivity} setPath={setContentActivity} />
                    <Path index={3} title="זמן צופיות" hint={hints.scoutingTime} setPath={setScoutingTime} isGenerate />
                    <Path index={4} title="זמן משחק" hint={hints.playingTime} setPath={setPlayingTime} isGenerate />
                </div>

                <div className={styles.btn_div}>
                    <button
                        disabled={isDisabled}
                        onClick={submitHandler}
                        className={styles.submit_btn}
                    >
                        אני רוצה הצעה לפעילות
                    </button>
                </div>
            </div>

            {clicked && <Loading></Loading>}
        </React.Fragment>
    );
}

export default ChoosePath;

import React, { useEffect, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import styles from "./ChoosePath.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Path from "../../components/Path/Path";
import { useErrorContext } from "../../context/ErrorContext";
import { buildActivityFromAI } from "../../service/buildActivity";
import { IoArrowForward } from "react-icons/io5";
import { PathActivity } from "../../models/constants/path";
import hints from "../../models/resources/hints.json";
import { PROMPT_LIMIT } from "../../models/constants/state";
import { initRawActivity } from "../../utils/activity";

function ChoosePath() {
    const { data, limit, updateLimit, updateDataByPath, resetAllUseFields } = useContentContext();
    const { handleError } = useErrorContext();

    const [clicked, setClicked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();

    const [pointOfView, setPointOfView] = useState(undefined);
    const [contentActivity, setContentActivity] = useState(undefined);
    const [scoutingTime, setScoutingTime] = useState(undefined);
    const [playingTime, setPlayingTime] = useState(undefined);

    useEffect(() => {
        // Disable the submit button if all options are empty
        setIsDisabled(pointOfView || contentActivity || scoutingTime || playingTime ? false : true);
    }, [pointOfView, contentActivity, scoutingTime, playingTime]);

    const submitHandler = async () => {
        updateLimit();
        if (!limit || limit < PROMPT_LIMIT - 1) {
            setClicked(true);
            const promises = [];
            const { amount, grade, gender, place } = data;

            if (pointOfView) {
                const { subject, time } = pointOfView;
                const path = PathActivity.pointOfView.path;
                const rawActivity = initRawActivity(subject, time, amount, grade, gender, place);

                promises.push(
                    buildActivityFromAI(path, rawActivity)
                        .then((result) => updateDataByPath(path, subject, time, result))
                        .catch((error) => handleError(error)),
                );
            }

            if (contentActivity) {
                const { subject, time } = contentActivity;
                const path = PathActivity.contentActivity.path;
                const rawActivity = initRawActivity(subject, time, amount, grade, gender, place);

                promises.push(
                    buildActivityFromAI(path, rawActivity)
                        .then((result) => updateDataByPath(path, subject, time, result))
                        .catch((error) => handleError(error)),
                );
            }

            if (scoutingTime) {
                const { subject, time } = scoutingTime;
                const path = PathActivity.scoutingTime.path;
                const rawActivity = initRawActivity(subject, time, amount, grade, gender, place);

                promises.push(
                    buildActivityFromAI(path, rawActivity)
                        .then((result) => updateDataByPath(path, subject, time, result))
                        .catch((error) => handleError(error)),
                );
            }

            if (playingTime) {
                const { subject, time } = playingTime;
                const path = PathActivity.playingTime.path;
                const rawActivity = initRawActivity(subject, time, amount, grade, gender, place);

                promises.push(
                    buildActivityFromAI(path, rawActivity)
                        .then((result) => updateDataByPath(path, subject, time, result))
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

                    <Path
                        index={1}
                        title="נקודת מבט"
                        hint={hints.pointOfView}
                        setPath={setPointOfView}
                    />
                    <Path
                        index={2}
                        title="פעילות תוכן"
                        hint={hints.contentActivity}
                        setPath={setContentActivity}
                    />
                    <Path
                        index={3}
                        title="זמן צופיות"
                        hint={hints.scoutingTime}
                        setPath={setScoutingTime}
                        isGenerate
                    />
                    <Path
                        index={4}
                        title="זמן משחק"
                        hint={hints.playingTime}
                        setPath={setPlayingTime}
                        isGenerate
                    />
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

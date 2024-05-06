import React, { useEffect, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import styles from "./ChoosePath.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Path from "../../components/Path/Path";
import { useErrorContext } from "../../context/ErrorContext";
import { IoArrowForward } from "react-icons/io5";
import { PathActivity } from "../../models/constants/path";
import hints from "../../models/resources/hints.json";
import { PROMPT_LIMIT } from "../../models/constants/state";
import { fetchGetActivity } from "../../utils/fetch";

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
        if (!limit || limit < PROMPT_LIMIT - 1) {
            const promises = [];
            const { amount, grade, gender, place } = data;

            if (pointOfView) {
                const { subject, time } = pointOfView;
                promises.push(
                    fetchGetActivity(updatePointOfView, {
                        fetchFrom: ["AI", "DB"],
                        path: PathActivity.pointOfView.path,
                        subject,
                        time,
                        amount,
                        grade,
                        gender,
                        place,
                    }).catch((error) => handleError(error)),
                );
            }

            if (contentActivity) {
                const { subject, time } = contentActivity;
                promises.push(
                    fetchGetActivity(updateContentActivity, {
                        fetchFrom: ["AI", "DB"],
                        path: PathActivity.contentActivity.path,
                        subject,
                        time,
                        amount,
                        grade,
                        gender,
                        place,
                    }).catch((error) => handleError(error)),
                );
            }

            if (scoutingTime) {
                const { subject, time } = scoutingTime;
                promises.push(
                    fetchGetActivity(updateScoutingTime, {
                        fetchFrom: ["AI", "DB"],
                        path: PathActivity.scoutingTime.path,
                        subject,
                        time,
                        amount,
                        grade,
                        gender,
                        place,
                    }).catch((error) => handleError(error)),
                );
            }

            if (playingTime) {
                const { subject, time } = playingTime;
                promises.push(
                    fetchGetActivity(updatePlayingTime, {
                        fetchFrom: ["AI", "DB"],
                        path: PathActivity.playingTime.path,
                        subject,
                        time,
                        amount,
                        grade,
                        gender,
                        place,
                    }).catch((error) => handleError(error)),
                );
            }

            try {
                setClicked(true);
                await Promise.allSettled(promises);
                navigate("/activity");
            } catch (error) {
                setClicked(false);
            }
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

                    <h1 className={styles.page_title}>בחרו את הפעילות שלכם</h1>

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

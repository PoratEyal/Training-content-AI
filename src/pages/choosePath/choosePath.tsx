import React, { useEffect, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import styles from "./choosePath.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Path from "../../components/Path/Path";
import { useErrorContext } from "../../context/ErrorContext";
import {
    buildContentActivityActivity,
    buildPlayingTimeActivity,
    buildPointOfViewActivity,
    buildScoutingTimeActivity,
} from "../../service/buildActivity";
import BackBtn from "../../components/backBtn/backBtn";

function ChoosePath() {
    const {
        data,
        updateLimit,
        updatePointOfView,
        updateContentActivity,
        updateScoutingTime,
        updatePlayingTime,
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
        setClicked(true);
        const promises = [];

        if (pointOfView) {
            const { subject, time } = pointOfView;
            promises.push(
                buildPointOfViewActivity(
                    subject,
                    time,
                    data.amount,
                    data.grade,
                    data.gender,
                    data.place,
                )
                    .then((result) => updatePointOfView(subject, time, result))
                    .catch((error) => {
                        handleError(error);
                    }),
            );
        }

        if (contentActivity) {
            const { subject, time } = contentActivity;
            promises.push(
                buildContentActivityActivity(
                    subject,
                    time,
                    data.amount,
                    data.grade,
                    data.gender,
                    data.place,
                )
                    .then((result) => updateContentActivity(subject, time, result))
                    .catch((error) => {
                        handleError(error);
                    }),
            );
        }

        if (scoutingTime) {
            const { subject, time } = scoutingTime;
            promises.push(
                buildScoutingTimeActivity(
                    subject,
                    time,
                    data.amount,
                    data.grade,
                    data.gender,
                    data.place,
                )
                    .then((result) => updateScoutingTime(subject, time, result))
                    .catch((error) => {
                        handleError(error);
                    }),
            );
        }

        if (playingTime) {
            const { subject, time } = playingTime;
            promises.push(
                buildPlayingTimeActivity(
                    subject,
                    time,
                    data.amount,
                    data.grade,
                    data.gender,
                    data.place,
                )
                    .then((result) => updatePlayingTime(subject, time, result))
                    .catch((error) => {
                        handleError(error);
                    }),
            );
        }

        await Promise.allSettled(promises);
        updateLimit();
        navigate("/activity");
        //await generateImg(data.playingTime.data)
    };

    return (
        <React.Fragment>
            <div className={!clicked ? styles.container : styles.container_disabled}>
                <div className={styles.checkbox_container}>
                    <div className={styles.navbar}>
                        <BackBtn path={"/"} />
                    </div>

                    <h3 className={styles.h3}>בחרו את הפעילות שלכם</h3>

                    <Path title="נקודת מבט" setPath={setPointOfView} />
                    <Path title="פעילות תוכן" setPath={setContentActivity} />
                    <Path title="זמן צופיות" setPath={setScoutingTime} />
                    <Path title="זמן משחק" setPath={setPlayingTime} />
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

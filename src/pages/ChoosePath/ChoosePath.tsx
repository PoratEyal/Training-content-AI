import React, { useEffect, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import styles from "./ChoosePath.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Path from "../../components/Path/Path";
import { useErrorContext } from "../../context/ErrorContext";
import { IoArrowForward } from "react-icons/io5";
import { PROMPT_LIMIT } from "../../models/constants/state";
import { fetchGetActivity } from "../../utils/fetch";

function ChoosePath() {
    const { data, limit, updateLimit, updateMovementPath, resetAllUseFields } = useContentContext();
    const { handleError } = useErrorContext();

    const { movement } = data || {};
    const { path } = movement || {};
    const [optionsPath, setOptionsPath] = useState(new Array(path?.length || 1).fill(undefined));

    const [clicked, setClicked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        setIsDisabled(optionsPath.every((option) => option === undefined));
    },[optionsPath])

    const submitHandler = async () => {
        updateLimit();
        if (!limit || limit < PROMPT_LIMIT - 1) {
            const promises = [];
            const { amount, grade, gender, place } = data;
            for (const option of optionsPath) {
                if (option !== undefined) {
                    const { subject, time, name, index } = option;
                    promises.push(
                        fetchGetActivity(updateMovementPath, index, {
                            fetchFrom: ["AI", "DB"],
                            path: name,
                            subject,
                            time,
                            amount,
                            grade,
                            gender,
                            place,
                        }).catch((error) => handleError(error)),
                    );
                }
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
        navigate("/details");
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

                    {path?.map((p, i) => (
                        <Path key={i} index={i} path={p} setPath={setOptionsPath} />
                    ))}
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

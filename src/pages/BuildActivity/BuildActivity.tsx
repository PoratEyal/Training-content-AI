import React, { useEffect, useRef, useState } from "react";
import { useErrorContext } from "../../context/ErrorContext";
import { useContentContext } from "../../context/ContentContext";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { isGroupDetailsChanged, updateUserMovement } from "../../utils/user";
import { fetchGetActivity, fetchUpdateUser } from "../../utils/fetch";
import styles from "./BuildActivity.module.css";
import Header from "../../components/Layout/Header/Header";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import SubjectInput from "../../components/SubjectInput/SubjectInput";
import SelectDetails from "../../components/SelectDetails/SelectDetails";
import { ActivityTimeOptions } from "../../models/resources/select";
import PartOption from "../../components/PartOption/PartOption";
import MainBtn from "../../components/MainBtn/MainBtn";
import LoadingActivity from "../../components/Loading/LoadingActivity/LoadingActivity";
import ActivitySubject from "../../components/ActivitySubject/ActivitySubject";
import { ActivityStructure } from "../../models/types/activity";

function BuildActivity() {
    const { handleError } = useErrorContext();
    const { data, updateMovementPath, clearPath } = useContentContext();
    const { isLoggedIn, currentUser, loading, reachUnRegisterLimit, updateUnRegisterLimit } =
        useAuthContext();

    const { movement } = data || {};
    const { parts } = movement || {};
    const [optionsPath, setOptionsPath] = useState(new Array(parts?.length || 1).fill(undefined));

    const [clicked, setClicked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    const lockRef = useRef(true);

    const [hasAlert, setHasAlert] = useState(false);

    const [structure, setStructure] = useState<ActivityStructure | undefined>(undefined);

    useEffect(() => {
        const updateUser = async () => {
            lockRef.current = false;
            if (isLoggedIn && currentUser) {
                if (isGroupDetailsChanged(currentUser.movement, data)) {
                    const updatedUser = updateUserMovement(
                        currentUser,
                        data.movement.name,
                        data.grade,
                        data.gender,
                        data.amount,
                        data.place,
                    );
                    await fetchUpdateUser({ user: updatedUser });
                }
            }
        };

        if (lockRef.current) updateUser();
    }, []);

    useEffect(() => {
        //set disabled button
        if (loading) setIsDisabled(true);
        else setIsDisabled(optionsPath.every((option) => option === undefined));
    }, [optionsPath, loading]);

    const submitHandler = async () => {
        updateUnRegisterLimit();
        if (!reachUnRegisterLimit()) {
            const promises = [];
            const { amount, grade, gender, place } = data;
            for (const option of optionsPath) {
                if (option !== undefined) {
                    const { subject, time, name, index } = option;
                    // promises.push(
                    //     fetchGetActivity(updateMovementPath, index, {
                    //         fetchFrom: ["AI", "DB"],
                    //         path: name,
                    //         subject,
                    //         time,
                    //         amount,
                    //         grade,
                    //         gender,
                    //         place,
                    //     }).catch((error) => handleError(error)),
                    // );
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
        clearPath();
        navigate("/details");
    };

    return (
        <section className={styles.choose_path_container}>
            <div>
                <Header goBack={goBack} />
                <div className={styles.h2_div}>
                    <label>
                        צרו את<br></br> הפעילות שלכם
                    </label>
                    <img alt="Sparks effect" src={"page3_effect.svg"}></img>
                </div>
            </div>

            <div className={styles.path_form_container}>
                <div className={styles.contnet_path}>
                    <img
                        className={styles.path_img}
                        alt="Yellow sign with heart"
                        src={"path.svg"}
                    ></img>

                    {loading ? (
                        <section className={styles.loading_mock_selection_container}>
                            <SmallLoading />
                        </section>
                    ) : (
                        <section className={styles.path_div}>
                            <ActivitySubject
                                setStructure={setStructure}
                                setHasAlert={setHasAlert}
                            />

                            {parts?.map((part, i) => (
                                <PartOption
                                    key={i}
                                    part={part}
                                    setStructure={setStructure}
                                    setHasAlert={setHasAlert}
                                />
                            ))}
                        </section>
                    )}
                </div>

                <div className={styles.btn_div}>
                    <MainBtn
                        isDisabled={isDisabled}
                        height={42}
                        text={"הצעה לפעילות"}
                        func={submitHandler}
                    ></MainBtn>
                </div>

                {hasAlert ? (
                    <div className={styles.input_alert}>
                        שימו לב! מקור הפעילויות הינו מערכת בינה מלאכותית, יכול להיות וחיפושים
                        מסויימים עדיין לא התעדכנו במערכת
                    </div>
                ) : null}

                {clicked ? <LoadingActivity /> : null}
            </div>
        </section>
    );
}

export default BuildActivity;

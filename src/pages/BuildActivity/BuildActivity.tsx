import React, { useEffect, useRef, useState } from "react";
import { useErrorContext } from "../../context/ErrorContext";
import { useContentContext } from "../../context/ContentContext";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { isGroupDetailsChanged, updateUserMovement } from "../../utils/user";
import { fetchGetActivity, fetchUpdateUser } from "../../utils/fetch";
import styles from "./BuildActivity.module.css";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import { ActivityTimeOptions } from "../../models/resources/select";
import MainBtn from "../../components/MainBtn/MainBtn";
import LoadingActivity from "../../components/Loading/LoadingActivity/LoadingActivity";
import { ActivityStructure } from "../../models/types/activity";
import msg from "../../models/resources/errorMsg.json";
import PartOption from "../../components/PartOption/PartOption";
import ActivitySubject from "../../components/ActivitySubject/ActivitySubject";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";

function BuildActivity() {
    const { handleError } = useErrorContext();
    const { data, updateMainActivity, clearPath } = useContentContext();
    const { isLoggedIn, currentUser, loading } = useAuthContext();

    const { movement } = data || {};
    const { parts } = movement || {};

    const [structure, setStructure] = useState<ActivityStructure | undefined>();

    const [clicked, setClicked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    const lockRef = useRef(true);

    const [hasAlert, setHasAlert] = useState(false);

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
        setIsDisabled(structure?.mainSubject === "" || structure?.time === "" ? true : false);
    }, [structure, loading]);

    const submitHandler = async () => {
        setClicked(true);
        const { amount, grade, gender, place } = data;
        try {
            const response = await fetchGetActivity({
                fetchFrom: ["AI", "DB"],
                parts: structure?.parts || [],
                subject: structure?.mainSubject || "",
                time: structure?.time || ActivityTimeOptions[0].value,
                amount,
                grade,
                gender,
                place,
            });
            if (
                (response.result === "success" || response.result === "safety") &&
                response.activity
            ) {
                updateMainActivity(response.activity);
                navigate(route.activity);
            }
        } catch (error) {
            handleError(msg.error.message);
            setClicked(false);
        }
    };

    const goBack = () => {
        clearPath();
        navigate(route.details);
    };

    return (
        <PageLayout path={route.build} hasGreenBackground hasHeader={{ goBack }}>
            <div className={styles.build_activity_title}>
                <label>
                    צרו את<br></br> הפעילות שלכם
                </label>
                <img alt="Sparks effect" src={"page3_effect.svg"}></img>
            </div>

            <div className={styles.build_form_container}>
                <div className={styles.build_content}>
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

                            <div>{"הוסיפו חלקים לפעולה (לא חובה)"}</div>
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
        </PageLayout>
    );
}

export default BuildActivity;

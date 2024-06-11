import { useEffect, useRef, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import styles from "./ChoosePath.module.css";
import { useNavigate } from "react-router-dom";
import Path from "../../components/Path/Path";
import { useErrorContext } from "../../context/ErrorContext";
import { fetchGetActivity } from "../../utils/fetch";
import MainBtn from "../../components/MainBtn/MainBtn";
import { useAuthContext } from "../../context/AuthContext";
import LoadingActivity from "../../components/Loading/LoadingActivity/LoadingActivity";
import { fetchUpdateUser } from "../../utils/fetch";
import { isGroupDetailsChanged, updateUserMovement } from "../../utils/user";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import msg from "../../models/resources/errorMsg.json";
import ChooseActivitySubject from "../../components/titles/ChooseActivitySubject/ChooseActivitySubject";

function ChoosePath() {
    const { handleAlert } = useErrorContext();
    const { data, updateMovementPath, clearPath } = useContentContext();
    const { isLoggedIn, currentUser, loading } = useAuthContext();

    const { movement } = data || {};
    const { path } = movement || {};
    const [optionsPath, setOptionsPath] = useState(new Array(path?.length || 1).fill(undefined));

    const [clicked, setClicked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    const lockRef = useRef(true);

    useEffect(() => {
        const updateUser = async () => {
            lockRef.current = false;
            try {
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
            } catch (error) {
                handleAlert(msg.error.message);
            }
        };

        if (lockRef.current) updateUser();
    }, []);

    useEffect(() => {
        if (loading) setIsDisabled(true);
        else setIsDisabled(optionsPath.every((option) => option === undefined));
    }, [optionsPath, loading]);

    const submitHandler = async () => {
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
                    }).catch(() => handleAlert(msg.error.message)),
                );
            }
        }
        try {
            setClicked(true);
            await Promise.allSettled(promises);
            navigate(route.activity);
        } catch (error) {
            setClicked(false);
        }
    };

    const goBack = () => {
        clearPath();
        navigate(route.details);
    };

    return (
        <PageLayout path={route.choosePath} hasGreenBackground hasHeader={{ goBack }}>
            <ChooseActivitySubject />

            <div className={styles.path_form_container}>
                <div className={styles.contnet_path}>
                    <img
                        className={styles.path_img}
                        title="Yellow sign with with heart"
                        alt="Yellow sign with with heart"
                        src={"path.svg"}
                        loading="lazy"
                        width={130}
                        height={160}
                    ></img>

                    {loading ? (
                        <div className={styles.loading_mock_selection_container}>
                            <SmallLoading />
                        </div>
                    ) : (
                        <div className={styles.path_div}>
                            {path?.map((p, i) => (
                                <Path key={i} index={i} path={p} setPath={setOptionsPath} />
                            ))}
                        </div>
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
                {!clicked ? <LoadingActivity /> : null}
            </div>
        </PageLayout>
    );
}

export default ChoosePath;

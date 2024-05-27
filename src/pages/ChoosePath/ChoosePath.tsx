import { useEffect, useRef, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import styles from "./ChoosePath.module.css";
import { useNavigate } from "react-router-dom";
import Path from "../../components/Path/Path";
import { useErrorContext } from "../../context/ErrorContext";
import { fetchGetActivity } from "../../utils/fetch";
import MainBtn from "../../components/MainBtn/MainBtn";
import { useAuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading/LoadingActivity/LoadingActivity";
import { fetchUpdateUser } from "../../utils/fetch";
import { VscLoading } from "react-icons/vsc";
import { isGroupDetailsChanged, updateUserMovement } from "../../utils/user";
import Header from "../../components/Layout/Header/Header";
import { PAGE3_EFFECT_IMG, PATH_IMG } from "../../models/constants/img";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";

function ChoosePath() {
    const { handleError } = useErrorContext();
    const { data, updateMovementPath, clearPath } = useContentContext();
    const { isLoggedIn, currentUser, loading, reachUnRegisterLimit, updateUnRegisterLimit } =
        useAuthContext();

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
        clearPath();
        navigate("/details");
    };

    return (
        <section className={styles.choose_path_container}>
            <div>
                <Header goBack={goBack} />
                <div className={styles.h2_div}>
                    <label>
                        בחרו את<br></br> נושא הפעילות
                    </label>
                    <img alt="Sparks effect" src={"page3_effect.svg"}></img>
                </div>
            </div>

            <div className={styles.path_form_container}>
                <div className={styles.contnet_path}>
                    <img
                        className={styles.path_img}
                        alt="Yellow sign with with heart"
                        src={"path.svg"}
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
                {clicked && <Loading></Loading>}
            </div>
        </section>
    );
}

export default ChoosePath;

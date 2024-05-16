import { useEffect, useRef, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import styles from "./ChoosePath.module.css";
import { useNavigate } from "react-router-dom";
import Path from "../../components/Path/Path";
import { useErrorContext } from "../../context/ErrorContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { fetchGetActivity } from "../../utils/fetch";
import MainBtn from "../../components/MainBtn/MainBtn";
import { useAuthContext } from "../../context/AuthContext";
import Profile from "../../components/auth/Profile/Profile";
import Loading from "../../components/Loading/Loading";
import { fetchUpdateUser } from "../../utils/fetch";
import { isGroupDetailsChanged, updateUserMovement } from "../../utils/user";

function ChoosePath() {
    const { handleError } = useErrorContext();
    const { data, updateMovementPath, clearPath } = useContentContext();
    const { isLoggedIn, currentUser, isNotReachUnRegisterLimit, updateUnRegisterLimit } =
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
        setIsDisabled(optionsPath.every((option) => option === undefined));
    }, [optionsPath]);

    const submitHandler = async () => {
        updateUnRegisterLimit();
        if (isNotReachUnRegisterLimit()) {
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
        <div className={styles.container}>
            <div>
                {isLoggedIn ? (
                    <Profile
                        img={currentUser?.image || ""}
                        name={currentUser?.name || "r"}
                        role="guide"
                    />
                ) : null}

                <IoMdArrowRoundBack
                    onClick={goBack}
                    className={styles.back_icon}
                ></IoMdArrowRoundBack>

                <div className={styles.h2_div}>
                    <label>בחרו את הפעילות</label>
                    <img alt="cool effect to the text" src="page3_effect.svg"></img>
                </div>
            </div>

            <div className={styles.contnet_div}>
                <img
                    className={styles.path_img}
                    alt="path icon and heart logo"
                    src="path.svg"
                ></img>

                <div className={styles.path_div}>
                    {path?.map((p, i) => (
                        <Path key={i} index={i} path={p} setPath={setOptionsPath} />
                    ))}
                </div>

                <div className={styles.btn_div}>
                    <MainBtn
                        isDisabled={isDisabled}
                        height={38}
                        text={"הצעה לפעילות"}
                        func={submitHandler}
                    ></MainBtn>
                </div>
            </div>
            {clicked && <Loading></Loading>}
        </div>
    );
}

export default ChoosePath;

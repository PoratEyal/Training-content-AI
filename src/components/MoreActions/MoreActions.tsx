import { useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useErrorContext } from "../../context/ErrorContext";
import styles from "./MoreActions.module.css";
import { fetchGetActivity } from "../../utils/fetch";
import { AiOutlineLoading } from "react-icons/ai";
import LikeBtns from "../LikeBtns/LikeBtns";
import ShareBtns from "../ShareBtns/ShareBtns";
import { MovementPath } from "../../models/types/movement";
import { useAuthContext } from "../../context/AuthContext";
import msg from "../../models/resources/errorMsg.json";

type MoreActionsProps = {
    index: number;
    movementPath: MovementPath;
};

function MoreActions({ index, movementPath }: MoreActionsProps) {
    const { updateMovementPath } = useContentContext();
    const { handleError } = useErrorContext();
    const { isReachGuestLimit } = useAuthContext();

    const [loadingGenerate, setLoadingGenerate] = useState(false);
    const [reset, setReset] = useState(false);

    const { name, activity } = movementPath;
    const { activity: text, subject, time, amount, grade, gender, place } = activity || {};

    const generateAgain = async () => {
        if (loadingGenerate) return;

        if (!isReachGuestLimit()) {
            setLoadingGenerate(true);
            setReset(true);

            fetchGetActivity(updateMovementPath, index, {
                fetchFrom: ["AI"],
                path: name,
                subject,
                time,
                amount,
                grade,
                gender,
                place,
            })
                .catch(() => handleError(msg.error.message))
                .finally(() => {
                    setLoadingGenerate(false);
                    setReset(false);
                });
        }
    };

    return (
        <section className={styles.more_actions_container}>
            {activity ? (
                <div className={styles.more_actions_left}>
                    <LikeBtns index={index} activity={activity} reset={reset} />
                    <ShareBtns text={text} />
                </div>
            ) : null}

            <button onClick={generateAgain} className={styles.button}>
                {loadingGenerate ? (
                    <div className={styles.btn_content_div}>
                        <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>
                    </div>
                ) : (
                    <div className={styles.btn_content_div}>
                        <span>פעילות אחרת</span>
                    </div>
                )}
            </button>
        </section>
    );
}

export default MoreActions;

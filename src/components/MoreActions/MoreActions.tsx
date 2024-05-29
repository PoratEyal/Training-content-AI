import { useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useErrorContext } from "../../context/ErrorContext";
import styles from "./MoreActions.module.css";
import { fetchGetActivity } from "../../utils/fetch";
import { AiOutlineLoading } from "react-icons/ai";
import LikeBtns from "../LikeBtns/LikeBtns";
import ShareBtns from "../ShareBtns/ShareBtns";
import { useAuthContext } from "../../context/AuthContext";
import { Activity } from "../../models/types/activity";

type MoreActionsProps = {
    activity: Activity;
};

function MoreActions({ activity }: MoreActionsProps) {
    const { updateMainActivity } = useContentContext();
    const { handleError } = useErrorContext();
    const { reachUnRegisterLimit, updateUnRegisterLimit } = useAuthContext();

    const [loadingGenerate, setLoadingGenerate] = useState(false);
    const [reset, setReset] = useState(false);

    const { activity: text, subject, parts, time, amount, grade, gender, place } = activity;

    const generateAgain = async () => {
        if (loadingGenerate) return;

        updateUnRegisterLimit();
        if (!reachUnRegisterLimit()) {
            setLoadingGenerate(true);
            setReset(true);

            try {
                const response = await fetchGetActivity({
                    fetchFrom: ["AI"],
                    parts,
                    subject,
                    time,
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
                }
            } catch (error) {
                handleError(error);
            } finally {
                setLoadingGenerate(false);
                setReset(false);
            }
        }
    };

    return (
        <section className={styles.more_actions_container}>
            {activity ? (
                <div className={styles.more_actions_left}>
                    <LikeBtns activity={activity} reset={reset} />
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
                        <label>פעילות אחרת</label>
                    </div>
                )}
            </button>
        </section>
    );
}

export default MoreActions;

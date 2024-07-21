import { useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useErrorContext } from "../../context/ErrorContext";
import styles from "./MoreActions.module.css";
import { fetchGetActivity } from "../../utils/fetch";
import { AiOutlineLoading } from "react-icons/ai";
import LikeBtns from "../LikeBtns/LikeBtns";
import ShareBtns from "../ShareBtns/ShareBtns";
import msg from "../../models/resources/errorMsg.json";
import { Activity } from "../../models/types/activity";

type MoreActionsProps = {
    activity: Activity;
    setNewActivity: React.Dispatch<React.SetStateAction<boolean>>;
};

function MoreActions({ activity, setNewActivity }: MoreActionsProps) {
    const { updateMainActivity } = useContentContext();
    const { handleAlert } = useErrorContext();

    const [loadingGenerate, setLoadingGenerate] = useState(false);
    const [reset, setReset] = useState(false);

    const { activity: text, parts, ...detailsData } = activity;

    const generateAgain = async () => {
        if (loadingGenerate) return;

        setLoadingGenerate(true);
        setReset(true);
        try {
            const response = await fetchGetActivity({
                fetchFrom: ["AI"],
                ...detailsData,
                parts,
            });
            if (
                (response.result === "success" || response.result === "safety") &&
                response.activity
            ) {
                updateMainActivity({ ...response.activity, parts });
            }
        } catch (error) {
            handleAlert(msg.error.message);
        } finally {
            setLoadingGenerate(false);
            setNewActivity(true);
            setReset(false);
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
                        <span>פעילות אחרת</span>
                    </div>
                )}
            </button>
        </section>
    );
}

export default MoreActions;

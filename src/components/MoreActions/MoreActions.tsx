import { useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useErrorContext } from "../../context/ErrorContext";
import styles from "./MoreActions.module.css";
import { fetchGetActivity } from "../../utils/fetch";
import { AiOutlineLoading } from "react-icons/ai";
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

    const { activity: text, ...detailsData } = activity;

    const generateAgain = async () => {
        if (loadingGenerate) return;

        setLoadingGenerate(true);
        setReset(true);
        try {
            const response = await fetchGetActivity({ ...detailsData });
            if (
                (response.result === "success" || response.result === "safety") &&
                response.activity
            ) {
                updateMainActivity(response.activity);
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
            
            <button onClick={generateAgain} className={styles.button}>
                {loadingGenerate ? (
                    <div className={styles.btn_content_div}>
                        <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>
                    </div>
                ) : (
                    <div className={styles.btn_content_div}>
                        <span>פעולה אחרת</span>
                    </div>
                )}
            </button>
            {activity ? (
                <div className={styles.more_actions_left}>
                    <ShareBtns text={text} />
                </div>
            ) : null}
        </section>
    );
}
export default MoreActions;

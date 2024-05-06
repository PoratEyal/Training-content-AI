import { useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useErrorContext } from "../../context/ErrorContext";
import { Activity, PathType } from "../../models/types/activity";
import { PROMPT_LIMIT } from "../../models/constants/state";
import styles from "./MoreActions.module.css";
import { fetchGetActivity } from "../../utils/fetch";
import ShareBtn from "../ShareBtn/ShareBtn";
import { FaWhatsapp } from "react-icons/fa";
import { BsFiletypeDocx } from "react-icons/bs";
import { formatWhatsUp, importDocx, importWhatsUp } from "../../utils/import";
import { AiOutlineLoading } from "react-icons/ai";
import LikeBtns from "../LikeBtns/LikeBtns";
import { WhatsappShareButton, WhatsappIcon } from "react-share";

type MoreActionsProps = {
    pathActivity: PathType;
};

function MoreActions({ pathActivity }: MoreActionsProps) {
    const { data, limit, updateLimit, contextUpdateSet } = useContentContext();
    const { handleError } = useErrorContext();

    const [loadingGenerate, setLoadingGenerate] = useState(false);
    const [reset, setReset] = useState(false);

    const { name, path } = pathActivity;
    const activity = data[path as keyof Activity];
    const { activity: text, subject, time, amount, grade, gender, place } = activity;

    const generateAgain = async () => {
        updateLimit();
        if (!limit || limit < PROMPT_LIMIT - 1) {
            setLoadingGenerate(true);
            setReset(true);

            const contextUpdateFunc = contextUpdateSet[path as keyof Activity];

            fetchGetActivity(contextUpdateFunc, {
                fetchFrom: ["AI"],
                path,
                subject,
                time,
                amount,
                grade,
                gender,
                place,
            })
                .catch((error) => handleError(error))
                .finally(() => {
                    setLoadingGenerate(false);
                    setReset(false);
                });
        }
    };

    return (
        <section className={styles.more_actions_container}>
            <div className={styles.all_icons_div}>
                <LikeBtns activity={activity} reset={reset} />

                <div className={styles.more_actions_share}>
                    {/* WhatsApp */}
                    <WhatsappShareButton
                        url={"https://activitybuilders.com/"}
                        title={formatWhatsUp(text)}
                    >
                        <div className={styles.iconBtn}>
                            <FaWhatsapp size={30} />
                        </div>
                    </WhatsappShareButton>
                    {/* Docx */}
                    <ShareBtn Icon={BsFiletypeDocx} func={() => importDocx(name, text)} />
                </div>
            </div>

            <button onClick={generateAgain} className={styles.button}>
                {!loadingGenerate ? (
                    <div className={styles.btn_content_div}>
                        <label>פעילות אחרת</label>
                    </div>
                ) : (
                    <div className={styles.btn_content_div}>
                        <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>
                    </div>
                )}
            </button>
        </section>
    );
}

export default MoreActions;

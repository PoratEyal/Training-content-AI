import React, { useState } from "react";
import styles from "./MoreActions.module.css";
import { FaWhatsapp } from "react-icons/fa";
import { BsFiletypeDocx } from "react-icons/bs";
import ShareCircleBtn from "../actions/btns/ShareCircleBtn/ShareCircleBtn";
import { importDocx, importWhatsUp } from "../../utils/import";
import { useErrorContext } from "../../context/ErrorContext";
import { useContentContext } from "../../context/ContentContext";
import { PROMPT_LIMIT } from "../../models/constants/state";
import AnotherActivityBtn from "../actions/btns/AnotherActivityBtn/AnotherActivityBtn";
import { buildActivityFromAI } from "../../service/buildActivity";
import { PathType } from "../../models/types/path";
import { ActivityType } from "../../models/types/context";
import LikeBtns from "../actions/btns/LikeBtns/LikeBtns";
import { initRawActivity } from "../../utils/activity";

type MoreActionsProps = {
    pathType: PathType;
    path: ActivityType;
};

function MoreActions({ path, pathType }: MoreActionsProps) {
    const { data, limit, updateLimit, updateDataByPath } = useContentContext();
    const { handleError } = useErrorContext();

    const [loadingGenerate, setLoadingGenerate] = useState(false);
    const [showContactUsModal, setShowContactUsModal] = useState(false);

    const generateAgain = async () => {
        updateLimit();
        if (!limit || limit < PROMPT_LIMIT - 1) {
            setLoadingGenerate(true);
            const { subject, time } = path;
            const { amount, grade, gender, place } = data;
            const rawActivity = initRawActivity(subject, time, amount, grade, gender, place);

            buildActivityFromAI(pathType.path, rawActivity)
                .then((result) => updateDataByPath(pathType.path, subject, time, result))
                .catch((error) => handleError(error))
                .finally(() => setLoadingGenerate(false));
        }
    };

    return (
        <div className={styles.button_and_icons_div}>
            <div className={styles.icons}>
                {/* WhatsApp */}
                <ShareCircleBtn
                    Icon={FaWhatsapp}
                    func={importWhatsUp}
                    title={pathType.name}
                    data={path.data}
                />
                {/* Docx */}
                <ShareCircleBtn
                    Icon={BsFiletypeDocx}
                    func={importDocx}
                    title={pathType.name}
                    data={path.data}
                />
            </div>

            <div className={styles.icons}>
                <LikeBtns />
            </div>

            <AnotherActivityBtn loadingGenerate={loadingGenerate} generateAgain={generateAgain} />
        </div>
    );
}

export default MoreActions;

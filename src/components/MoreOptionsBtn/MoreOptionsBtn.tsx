import React, { useState } from "react";
import styles from "./MoreOptionsBtn.module.css";
import { TfiMoreAlt } from "react-icons/tfi";
import { Activity } from "../../models/types/activity";
import CopyBtn from "../options/moreBtn/CopyBtn/CopyBtn";
import ShareBtn from "../options/moreBtn/ShareBtn/ShareBtn";
import SaveBtn from "../options/moreBtn/SaveBtn/SaveBtn";
import EditBtn from "../options/moreBtn/EditBtn/EditBtn";

type MoreOptionsBtnProps = {
    activity: Activity;
    hasSave?: boolean;
    hasEdit?: boolean;
    hasCopy?: boolean;
    hasShare?: boolean;
};

const MoreOptionsBtn: React.FC<MoreOptionsBtnProps> = ({
    activity,
    hasSave,
    hasEdit,
    hasCopy,
    hasShare,
}) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked((prev) => !prev);
    };

    return (
        <div className={styles.moreBtnWrapper}>
            <div className={styles.moreBtnContainer} onClick={handleClick}>
                <TfiMoreAlt className={`${styles.icon} ${isClicked ? styles.rotated : ""}`} />
                <div
                    className={`${styles.saveBtnContainer} ${isClicked ? styles.showSaveBtn : ""}`}
                >
                    {hasCopy ? <CopyBtn activity={activity} /> : null}
                    {hasShare ? <ShareBtn activity={activity} /> : null}
                    {hasSave ? <SaveBtn activity={activity} /> : null}
                    {hasEdit ? <EditBtn activity={activity} /> : null}
                </div>
            </div>
        </div>
    );
};
export default MoreOptionsBtn;

import React from "react";
import styles from "./ShareBtn.module.css";
import { Activity } from "../../../../models/types/activity";
import { FaShare } from "react-icons/fa";
import { WhatsappShareButton } from "react-share";
import { formatWhatsUp } from "../../../../utils/format";
import { WEBSITE_URL } from "../../../../models/constants";

type ShareBtnProps = {
    activity: Activity;
};

const ShareBtn: React.FC<ShareBtnProps> = ({ activity }) => {
    return (
        <WhatsappShareButton
            className={styles.shareBtn}
            url={WEBSITE_URL}
            title={formatWhatsUp(activity?.activity)}
        >
            <FaShare className={styles.icon} />
        </WhatsappShareButton>
    );
};
export default ShareBtn;

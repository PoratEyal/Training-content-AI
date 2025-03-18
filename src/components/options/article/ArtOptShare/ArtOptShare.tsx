import React from "react";
import styles from "./ArtOptShare.module.css";
import { Activity } from "../../../../models/types/activity";
import { FaShare } from "react-icons/fa";
import { WhatsappShareButton } from "react-share";
import { formatWhatsUp } from "../../../../utils/format";
import { WEBSITE_URL } from "../../../../models/constants";

type ArtOptShareProps = {
    activity: Activity;
};

const ArtOptShare: React.FC<ArtOptShareProps> = ({ activity }) => {
    return (
        <WhatsappShareButton
            className={styles.shareBtn}
            url={WEBSITE_URL}
            title={formatWhatsUp(activity?.activity)}
        >
            <FaShare className={styles.icon} />
            <span className={styles.text}>שיתוף</span>
        </WhatsappShareButton>
    );
};
export default ArtOptShare;

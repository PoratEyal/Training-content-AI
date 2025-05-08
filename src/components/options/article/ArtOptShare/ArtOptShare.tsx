import React from "react";
import styles from "./ArtOptShare.module.css";
import { Activity } from "../../../../models/types/activity";
import { FaShare } from "react-icons/fa";
import { WhatsappShareButton } from "react-share";
import { formatWhatsUp } from "../../../../utils/format";
import { WEBSITE_URL } from "../../../../models/constants";
import { useTranslation } from "react-i18next";

type ArtOptShareProps = {
    activity: Activity;
};

const ArtOptShare: React.FC<ArtOptShareProps> = ({ activity }) => {
    const { t } = useTranslation();
    
    return (
        <WhatsappShareButton
            className={styles.shareBtn}
            url={WEBSITE_URL}
            title={formatWhatsUp(activity?.activity)}
        >
            <FaShare className={styles.icon} />
            <span className={styles.text}>{t('activity.share')}</span>
        </WhatsappShareButton>
    );
};
export default ArtOptShare;

import React from "react";
import styles from "./ArtOptShare.module.css";
import { FaShare } from "react-icons/fa";
import { WhatsappShareButton } from "react-share";
import { Activity } from "../../../../models/types/activity";
import { formatWhatsUp } from "../../../../utils/format";
import { WEBSITE_URL } from "../../../../models/constants";
import { useLanguage } from "../../../../i18n/useLanguage";

type ArtOptShareProps = {
    activity: Activity;
};

const ArtOptShare: React.FC<ArtOptShareProps> = ({ activity }) => {
    const { t, dir } = useLanguage();
    return (
        <WhatsappShareButton
            className={`${styles.shareBtn} ${styles[dir]}`}
            url={WEBSITE_URL}
            title={formatWhatsUp(activity?.activity)}
        >
            <FaShare className={styles.icon} />
            <span className={styles.text}>{t('articleOptions.share.title')}</span>
        </WhatsappShareButton>
    );
};
export default ArtOptShare;

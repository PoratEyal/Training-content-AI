import React from "react";
import styles from "./ArtOptShare.module.css";
import { FaShare } from "react-icons/fa";
import { Activity } from "../../../../models/types/activity";
import { WEBSITE_URL } from "../../../../models/constants";
import { formatWhatsUp } from "../../../../utils/format";
import { useLanguage } from "../../../../i18n/useLanguage";

type ArtOptShareProps = { activity: Activity };

const ArtOptShare: React.FC<ArtOptShareProps> = ({ activity }) => {
  const { t, dir } = useLanguage();

  const handleShare = async () => {
    const shareText = `${formatWhatsUp(activity?.activity)}\n\n${WEBSITE_URL}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: t("articleOptions.share.title"),
          text: shareText, 
        });
        return;
      } catch {
      }
    }

    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  return (
    <button
      className={`${styles.shareBtn} ${styles[dir]}`}
      onClick={handleShare}
      type="button"
    >
      <FaShare className={styles.icon} />
      <span className={styles.text}>{t("articleOptions.share.title")}</span>
    </button>
  );
};

export default ArtOptShare;

import React from "react";
import styles from "./ArtOptShare.module.css";
import { Activity } from "../../../../models/types/activity";
import { WEBSITE_URL } from "../../../../models/constants";
import { formatWhatsUp } from "../../../../utils/format";
import { useLanguage } from "../../../../i18n/useLanguage";
import { Icons } from "../../../Icons";  // Updated to use your centralized icons

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
        // fallback if navigator.share fails
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
      <Icons.Share className={styles.icon} />  {/* Use centralized icon */}
      <span className={styles.text}>{t("articleOptions.share.title")}</span>
    </button>
  );
};

export default ArtOptShare;

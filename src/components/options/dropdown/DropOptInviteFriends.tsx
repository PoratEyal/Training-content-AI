import React from "react";
import styles from "./dropdown.module.css";
import { formatWhatsUp } from "../../../utils/format";
import { WEBSITE_URL } from "../../../models/constants";
import { Icons } from "../../Icons";
import { useContentContext } from "../../../context/ContentContext";
import { useLocation } from "react-router-dom";
import route from "../../../router/route.json";
import { useLanguage } from "../../../i18n/useLanguage";

function DropOptInviteFriends() {
    const { t } = useLanguage();
    const { mainActivity } = useContentContext();
    const location = useLocation();

    const shareText = formatWhatsUp(
        location.pathname === route.activity ? mainActivity?.activity : undefined,
    );

    const fullText = `${shareText}\n\n${WEBSITE_URL}`;

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: t("profile.dropOptInviteFriends.invite"),
                    text: fullText,
                });
                return;
            } catch {

            }
        }

        window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`, "_blank");
    };

    return (
        <button onClick={handleShare} className={styles.text_and_icon} type="button">
            {t("profile.dropOptInviteFriends.invite")}
            <Icons.share />
        </button>
    );
}

export default DropOptInviteFriends;

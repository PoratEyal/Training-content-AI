import React from "react";
import styles from "./dropdown.module.css";
import { WhatsappShareButton } from "react-share";
import { formatWhatsUp } from "../../../utils/format";
import { WEBSITE_URL } from "../../../models/constants";
import { Icons } from "../../Icons";
import { useTranslation } from "react-i18next";
import { useContentContext } from "../../../context/ContentContext";
import { useLocation } from "react-router-dom";
import route from "../../../router/route.json";

function DropOptInviteFriends() {
    const { mainActivity } = useContentContext();
    const location = useLocation();
    const { t } = useTranslation();

    const setMsg = () => {
        return formatWhatsUp(
            location.pathname === route.activity ? mainActivity?.activity : undefined,
        );
    };

    return (
        <WhatsappShareButton className={styles.text_and_icon} url={WEBSITE_URL} title={setMsg()}>
            {t("profile.dropOptInviteFriends.invite")}
            <Icons.share />
        </WhatsappShareButton>
    );
}

export default DropOptInviteFriends;
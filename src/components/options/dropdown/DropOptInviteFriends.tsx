import React from "react";
import styles from "./dropdown.module.css";
import { WhatsappShareButton } from "react-share";
import { formatInviteFriend } from "../../../utils/format";
import { WEBSITE_URL } from "../../../models/constants";
import { Icons } from "../../Icons";
import { useTranslation } from "react-i18next";

function DropOptInviteFriends() {
  const { t } = useTranslation();

  return (
    <WhatsappShareButton
      className={styles.text_and_icon}
      url={WEBSITE_URL}
      title={formatInviteFriend()}
    >
      {t("profile.dropOptInviteFriends.invite")}
      <Icons.share />
    </WhatsappShareButton>
  );
}

export default DropOptInviteFriends;

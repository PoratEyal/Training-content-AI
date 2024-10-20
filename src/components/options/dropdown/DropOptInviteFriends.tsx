import React from "react";
import styles from "./dropdown.module.css";
import { IoMdShare } from "react-icons/io";
import { WhatsappShareButton } from "react-share";
import { formatInviteFriend } from "../../../utils/format";
import { WEBSITE_URL } from "../../../models/constants";

function DropOptInviteFriends() {
    return (
        <WhatsappShareButton
            className={styles.text_and_icon}
            url={WEBSITE_URL}
            title={formatInviteFriend()}
        >
            הזמינו חברים
            <IoMdShare />
        </WhatsappShareButton>
    );
}

export default DropOptInviteFriends;

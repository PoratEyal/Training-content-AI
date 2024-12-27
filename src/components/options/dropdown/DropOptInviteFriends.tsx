import styles from "./dropdown.module.css";
import { WhatsappShareButton } from "react-share";
import { formatInviteFriend } from "../../../utils/format";
import { WEBSITE_URL } from "../../../models/constants";
import { Icons } from "../../Icons";

function DropOptInviteFriends() {
    return (
        <WhatsappShareButton
            className={styles.text_and_icon}
            url={WEBSITE_URL}
            title={formatInviteFriend()}
        >
            שתפו עם חברים 
            <Icons.share />
        </WhatsappShareButton>
    );
}

export default DropOptInviteFriends;

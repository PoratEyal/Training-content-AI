import styles from "./dropdown.module.css";
import { WhatsappShareButton } from "react-share";
import { formatWhatsUp } from "../../../utils/format";
import { WEBSITE_URL } from "../../../models/constants";
import { Icons } from "../../Icons";
import { useContentContext } from "../../../context/ContentContext";
import { useLocation } from "react-router-dom";
import route from "../../../router/route.json";

function DropOptInviteFriends() {
    const { mainActivity } = useContentContext();
    const location = useLocation();

    const setMsg = () => {
        return formatWhatsUp(
            location.pathname === route.activity ? mainActivity?.activity : undefined,
        );
    };

    return (
        <WhatsappShareButton className={styles.text_and_icon} url={WEBSITE_URL} title={setMsg()}>
            שתפו עם חברים
            <Icons.share />
        </WhatsappShareButton>
    );
}

export default DropOptInviteFriends;

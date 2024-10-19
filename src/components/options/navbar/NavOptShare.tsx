import styles from "./navbar.module.css";
import { IoMdShare } from "react-icons/io";
import { WhatsappShareButton } from "react-share";
import { formatInviteFriend, formatWhatsUp } from "../../../utils/format";
import { WEBSITE_URL } from "../../../models/constants";
import { useLocation } from "react-router-dom";
import route from "../../../router/route.json";
import { useContentContext } from "../../../context/ContentContext";

const NavOptShare = () => {
    const { mainActivity } = useContentContext();
    const location = useLocation();

    const setMsg = () => {
        if (location.pathname === route.activity && mainActivity?.activity) {
            return formatWhatsUp(mainActivity.activity);
        }
        return formatInviteFriend();
    };

    return (
        <WhatsappShareButton className={styles.navbar_icon} url={WEBSITE_URL} title={setMsg()}>
            <IoMdShare className={styles.icon} />
            <span>שיתוף</span>
        </WhatsappShareButton>
    );
};

export default NavOptShare;

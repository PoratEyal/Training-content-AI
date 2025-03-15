import styles from "./navbar.module.css";
import { WhatsappShareButton } from "react-share";
import { formatWhatsUp } from "../../../utils/format";
import { WEBSITE_URL } from "../../../models/constants";
import { useLocation } from "react-router-dom";
import route from "../../../router/route.json";
import { useContentContext } from "../../../context/ContentContext";
import { Icons } from "../../Icons";

const NavOptShare = () => {
    const { mainActivity } = useContentContext();
    const location = useLocation();

    const setMsg = () => {
        if (location.pathname === route.activity && mainActivity?.activity) {
            return formatWhatsUp(mainActivity.activity);
        }
    };

    return (
        <WhatsappShareButton className={styles.navbar_icon} url={WEBSITE_URL} title={setMsg()}>
            <Icons.share className={styles.icon} />
            <span>שיתוף</span>
        </WhatsappShareButton>
    );
};

export default NavOptShare;

import styles from "./dropdown.module.css";
import { Icons } from "../../Icons";
import { useLanguage } from "../../../i18n/useLanguage";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";

type DropOptEventProps = {
    handleClose: () => void;
};

function DropOptEvent({ handleClose }: DropOptEventProps) {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();

    const handleClick = () => {
        const langKey = lang.charAt(0).toUpperCase() + lang.slice(1);
        const routeObj = route as Record<string, string>;
        const eventPath = routeObj[`eventHomePage${langKey}`] || routeObj.eventHomePageEn;
        navigate(eventPath);
        handleClose();
    };

    return (
        <span className={styles.text_and_icon} onClick={handleClick}>
            {t("profile.dropOptEvent.event")}
            <Icons.magic />
        </span>
    );
}

export default DropOptEvent;

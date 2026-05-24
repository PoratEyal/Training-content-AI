import styles from "./dropdown.module.css";
import { Icons } from "../../Icons";
import { useLanguage } from "../../../i18n/useLanguage";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";

type DropOptPracticeProps = {
    handleClose: () => void;
};

function DropOptPractice({ handleClose }: DropOptPracticeProps) {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();

    const handleClick = () => {
        const langKey = lang.charAt(0).toUpperCase() + lang.slice(1);
        // Types in route.json: route.json properties can be indexed like this
        const routeObj = route as Record<string, string>;
        const practicePath = routeObj[`practiceHomePage${langKey}`] || routeObj.practiceHomePageEn;
        navigate(practicePath);
        handleClose();
    };

    return (
        <span className={styles.text_and_icon} onClick={handleClick}>
            {t("profile.dropOptPractice.practice")}
            <Icons.magic />
        </span>
    );
}

export default DropOptPractice;

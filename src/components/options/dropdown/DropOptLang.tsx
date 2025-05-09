import styles from "./dropdown.module.css";
import { Icons } from "../../Icons";
import { useLanguage } from "../../../i18n/useLanguage";

type DropOptLangProps = {
    handleClose: () => void;
    openLangPopup: () => void
};

function DropOptLang({ handleClose, openLangPopup }: DropOptLangProps) {
    const { t } = useLanguage();

    const handleClick = async () => {
        openLangPopup();
        handleClose();
    };

    return (
        <span className={styles.text_and_icon} onClick={handleClick}>
            {t("profile.dropOptLang.lang")}
            <Icons.language />
        </span>
    );
}

export default DropOptLang;

import styles from "./dropdown.module.css";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import { Icons } from "../../Icons";
import { useLanguage } from "../../../i18n/useLanguage";

type DropdownOption = {
  handleClose: () => void;
};

function DropOptLang({ handleClose }: DropdownOption) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleClick = async () => {
    navigate(route.faq);
    handleClose();
  };

  return (
    <span className={styles.text_and_icon} onClick={handleClick}>
      {t("profile.dropOptFQA.fqa")}
      <Icons.fqa />
    </span>
  );
}

export default DropOptLang;

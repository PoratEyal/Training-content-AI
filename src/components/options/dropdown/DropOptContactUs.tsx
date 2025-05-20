import styles from "./dropdown.module.css";
import { Icons } from "../../Icons";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import { useLanguage } from "../../../i18n/useLanguage";

type ContactUsProps = {
  handleClose: () => void;
};

function DropOptContactUs({ handleClose }: ContactUsProps) {
  const { t } = useLanguage();

  const navigate = useNavigate();

  const handleClick = () => {
      navigate(route.contactUs);
      handleClose();
  };

  return (
    <span className={styles.text_and_icon} onClick={handleClick}>
      {t("profile.dropOptContactUs.contact")}
      <Icons.contactUs />
    </span>
  );
}

export default DropOptContactUs;

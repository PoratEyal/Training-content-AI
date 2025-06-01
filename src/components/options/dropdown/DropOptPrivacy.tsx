//
// This is a dropdown menu option that navigates the user to the Privacy Policy page.
// It dynamically adjusts the navigation link based on the user's selected language.
//
import styles from "./dropdown.module.css";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import { Icons } from "../../Icons";
import { useLanguage } from "../../../i18n/useLanguage";

type DropdownOption = {
  handleClose: () => void;
};

function DropOptPrivacy({ handleClose }: DropdownOption) {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  // Determine the privacy policy route path based on the active language (fallback to Hebrew)
  const privacyPolicyPath =
    route[`privacyPolicy${lang.charAt(0).toUpperCase() + lang.slice(1)}`] ||
    "/he/privacy-policy";

  const handleClick = () => {
    navigate(privacyPolicyPath);
    handleClose();
  };

  return (
    <span className={styles.text_and_icon} onClick={handleClick}>
      {t("profile.dropOptPrivacy.policy")}
      <Icons.privacyPolicy />
    </span>
  );
}

export default DropOptPrivacy;

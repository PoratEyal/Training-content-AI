//
// This is a dropdown option for logging out the user.
// It clears all user data from the context and logs them out.
// The page navigates to the home page, adjusting for the current language.
//
import React from "react";
import styles from "./dropdown.module.css";
import { useContentContext } from "../../../context/ContentContext";
import { useAuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import { Icons } from "../../Icons";
import { useLanguage } from "../../../i18n/useLanguage";

type DropdownOption = {
  handleClose: () => void;
};

function DropOptLogout({ handleClose }: DropdownOption) {
  const { t, lang } = useLanguage();
  const { clearAll } = useContentContext();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  // Determine the language-specific home page path (fallback to He)
  const homePagePath =
    route[`home${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || "/he";

  const handleLogout = async () => {
    await logout();
    clearAll();
  };

  const handleClick = async () => {
    await handleLogout();
    navigate(homePagePath);
    handleClose();
  };

  return (
    <span className={styles.text_and_icon} onClick={handleClick}>
      {t("profile.dropOptLogout.logout")}
      <Icons.logout />
    </span>
  );
}

export default DropOptLogout;

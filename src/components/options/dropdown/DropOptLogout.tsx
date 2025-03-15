import React from "react";
import styles from "./dropdown.module.css";
import { useContentContext } from "../../../context/ContentContext";
import { useAuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import { Icons } from "../../Icons";
import { useTranslation } from "react-i18next";

type DropdownOption = {
  handleClose: () => void;
};

function DropOptLogout({ handleClose }: DropdownOption) {
  const { clearAll } = useContentContext();
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await logout();
    clearAll();
  };

  const handleClick = async () => {
    await handleLogout();
    navigate(route.home);
    handleClose();
  };

  return (
    <span className={styles.text_and_icon} onClick={() => handleClick()}>
      {t("profile.dropOptLogout.logout")}
      <Icons.logout />
    </span>
  );
}

export default DropOptLogout;

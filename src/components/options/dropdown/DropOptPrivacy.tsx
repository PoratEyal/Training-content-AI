import React from "react";
import styles from "./dropdown.module.css";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import { Icons } from "../../Icons";
import { useTranslation } from "react-i18next";

type DropdownOption = {
  handleClose: () => void;
};

function DropOptPrivacy({ handleClose }: DropdownOption) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = async () => {
    navigate(route.privacyPolicy);
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

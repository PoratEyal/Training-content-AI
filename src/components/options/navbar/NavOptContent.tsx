//
// This is a navigation option button that takes users to the ActivityWiz Static Content page.
// The path dynamically adapts to the current active language.
//
import { useLocation, useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import styles from "./navbar.module.css";
import { useEffect, useState } from "react";
import { Icons } from "../../Icons";
import { useLanguage } from "../../../i18n/useLanguage";

const NavOptContent = () => {
  const { t, lang } = useLanguage();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the language-specific path for the content page
  const awTopicsPath = route[`AW_Topics${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.AW_TopicsHe;

  useEffect(() => {
    setIsSelected(location.pathname.includes(awTopicsPath));
  }, [location.pathname, awTopicsPath]);

  return (
    <div
      onClick={() => navigate(awTopicsPath)}
      className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
    >
      <Icons.output className={styles.icon} />
      <span className={styles.text}>{t("navbar.content")}</span>
    </div>
  );
};

export default NavOptContent;

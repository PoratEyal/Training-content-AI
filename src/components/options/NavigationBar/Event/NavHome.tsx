import route from "../../../../router/route.json";
import styles from "../navbar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icons } from "../../../Icons";
import { useLanguage } from "../../../../i18n/useLanguage";

const NavOptHome = () => {
  const { t, lang } = useLanguage();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the language-specific home path
  const eventHomePagePath = route[`eventHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.eventHomePageEn;

  useEffect(() => {
    setIsSelected(location.pathname === eventHomePagePath);
  }, [location.pathname, eventHomePagePath]);

  return (
    <div
      onClick={() => navigate(eventHomePagePath)}
      className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
    >
      <Icons.home className={styles.icon} />
      <span className={styles.text}>{t("event.Navbar.home")}</span>
    </div>
  );
};

export default NavOptHome;

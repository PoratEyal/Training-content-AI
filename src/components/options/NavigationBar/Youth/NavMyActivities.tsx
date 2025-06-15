//
// This is a navigation option button for the “My Saved Activities” page in the bottom navbar.
//
import route from "../../../../router/route.json";
import styles from "../navbar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icons } from "../../../Icons";
import { useLanguage } from "../../../../i18n/useLanguage";

const NavOptMyActivities = () => {
  const { t, lang } = useLanguage();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the language-specific path for My Saved Activities
  const myActivitiesPath = route[`youthMyActivities${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthMyActivitiesEn;

  useEffect(() => {
    setIsSelected(location.pathname === myActivitiesPath);
  }, [location.pathname, myActivitiesPath]);

  return (
    <div
      onClick={() => navigate(myActivitiesPath)}
      className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
    >
      <Icons.bookmark className={styles.icon} />
      <span className={styles.text}>{t("navbar.myActivities")}</span>
    </div>
  );
};

export default NavOptMyActivities;

//
// This is a navigation option button that takes users to the "Build Activity" flow.
// It highlights itself as active when the current URL matches any of the build-related paths.
// It dynamically adapts paths based on the active language.
//
import styles from "./navbar.module.css";
import route from "../../../router/route.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icons } from "../../Icons";
import { useLanguage } from "../../../i18n/useLanguage";

const NavOptBuild = () => {
  const { t, lang } = useLanguage();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamically determine language-specific paths (fallback to He paths if not available)
  const groupDetailsPath = route[`groupDetails${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.GroupDetailsHe;
  const AI_activityParamsPath = route[`AI_activityParams${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.AI_activityParamsHe;
  const AI_activityPath = route[`AI_activityContent${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.AI_activityContentHe;


  // Determine whether the current page is one of the build-related pages
  useEffect(() => {
    if (
      location.pathname === groupDetailsPath ||
      location.pathname === AI_activityParamsPath ||
      location.pathname === AI_activityPath
    ) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [location.pathname, groupDetailsPath, AI_activityParamsPath, AI_activityPath]);

  return (
    <div
      onClick={() => navigate(groupDetailsPath)}
      className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
    >
      <Icons.magic className={styles.icon} />
      <span className={styles.text}>{t("navbar.build")}</span>
    </div>
  );
};

export default NavOptBuild;

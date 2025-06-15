//
// This is a navigation option button that takes users to the "Build Activity" flow.
// It highlights itself as active when the current URL matches any of the build-related paths.
// It dynamically adapts paths based on the active language.
//
import styles from "../navbar.module.css";
import route from "../../../../router/route.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icons } from "../../../Icons";
import { useLanguage } from "../../../../i18n/useLanguage";

const NavOptBuild = () => {
  const { t, lang } = useLanguage();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamically determine language-specific paths (fallback to He paths if not available)
  const youthDetailsPath = route[`youthDetails${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthDetailsEn;
  const youthBuildPath = route[`youthBuild${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthBuildEn;
  const youthActivityAIPath = route[`youthActivityAI${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthActivityAIEn;


  // Determine whether the current page is one of the build-related pages
  useEffect(() => {
    if (
      location.pathname === youthDetailsPath ||
      location.pathname === youthBuildPath ||
      location.pathname === youthActivityAIPath
    ) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [location.pathname, youthDetailsPath, youthBuildPath, youthActivityAIPath]);

  return (
    <div
      onClick={() => navigate(youthDetailsPath)}
      className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
    >
      <Icons.magic className={styles.icon} />
      <span className={styles.text}>{t("navbar.build")}</span>
    </div>
  );
};

export default NavOptBuild;

import styles from "../navbar.module.css";
import route from "../../../../router/route.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icons } from "../../../Icons";
import { useLanguage } from "../../../../i18n/useLanguage";

const NavOptHome = () => {
  const { t, lang } = useLanguage();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const homePagePath = route[`wordsHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsHomePageEn;

  useEffect(() => {
    setIsSelected(location.pathname === homePagePath);
  }, [location.pathname, homePagePath]);

  return (
    <div
      onClick={() => navigate(homePagePath)}
      className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
    >
      <Icons.home className={styles.icon} />
      <span className={styles.text}>{t("words.Navbar.home")}</span>
    </div>
  );
};

export default NavOptHome;

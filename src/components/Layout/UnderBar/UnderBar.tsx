import styles from "./UnderBar.module.css";
import NavOptBuild from "../../options/navbar/NavOptBuild";
import NavOptContent from "../../options/navbar/NavOptContent";
import NavOptHome from "../../options/navbar/NavOptHome";
import NavOptMyActivities from "../../options/navbar/NavOptMyActivities";
import { useAuthContext } from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";

const UnderBar = () => {
  const { isLoggedIn } = useAuthContext();
  const { i18n } = useTranslation();
  const isHebrew = i18n.language === "he"; 

  return (
    <nav
      className={
        isHebrew
          ? styles.navbar_container
          : `${styles.navbar_container} ${styles.ltr_nav}`
      }
    >
      <NavOptHome />
      <NavOptBuild />
      <NavOptContent />
      {isLoggedIn ? <NavOptMyActivities /> : null}
    </nav>
  );
};

export default UnderBar;

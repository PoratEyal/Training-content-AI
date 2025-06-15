import styles from "../navbar.module.css";
import route from "../../../../router/route.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icons } from "../../../Icons";
import { useLanguage } from "../../../../i18n/useLanguage";

const NavOptTopic = () => {
  const { t, lang } = useLanguage();
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const topicPath = route[`practiceTopic${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceTopicEn;
  const quizPath = route[`practiceQuiz${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceQuizEn;

  useEffect(() => {
    setIsSelected(location.pathname === topicPath || location.pathname === quizPath);
  }, [location.pathname, topicPath, quizPath]);

  return (
    <div
      onClick={() => navigate(topicPath)}
      className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
    >
      <Icons.magic className={styles.icon} />
      <span className={styles.text}>{t("navbar.practiceBuild")}</span>
    </div>
  );
};

export default NavOptTopic;

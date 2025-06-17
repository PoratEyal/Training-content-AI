import styles from "../navbar.module.css";
import route from "../../../../router/route.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icons } from "../../../Icons";
import { useLanguage } from "../../../../i18n/useLanguage";
import { useCookiesContext } from "../../../../context/CookiesContext"; 

const NavOptTopic = () => {
  const { t, lang } = useLanguage();
  const { cookieLimit, setLimitCookie } = useCookiesContext(); 
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const topicPath = route[`practiceTopic${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceTopicEn;
  const quizPath = route[`practiceQuiz${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceQuizEn;

  useEffect(() => {
    setIsSelected(location.pathname === topicPath || location.pathname === quizPath);
  }, [location.pathname, topicPath, quizPath]);

  const handleClick = () => {
    if (!cookieLimit) {
      setLimitCookie(new Date().toString());
    }
    navigate(topicPath);
  };

  return (
    <div
      onClick={handleClick}
      className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
    >
      <Icons.magic className={styles.icon} />
      <span className={styles.text}>{t("navbar.practiceBuild")}</span>
    </div>
  );
};

export default NavOptTopic;

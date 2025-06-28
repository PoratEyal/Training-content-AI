import styles from "../navbar.module.css";
import route from "../../../../router/route.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icons } from "../../../Icons";
import { useLanguage } from "../../../../i18n/useLanguage";
import { useCookiesContext } from "../../../../context/CookiesContext";
import { startAsGuestOrUser } from "../../../../utils/startAsGuestOrUser"
import { useAuthContext } from "../../../../context/AuthContext"
import useSignIn from "../../../../hooks/useSignIn"

const NavOptTopic = () => {

  const { t, lang } = useLanguage();
  const { cookieLimit, setLimitCookie } = useCookiesContext();
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isLoggedIn } = useAuthContext()
  const { signInWithGoogle } = useSignIn()

  const topicPath = route[`wordsTopic${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsTopicEn;
  const quizPath = route[`wordsQuiz${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsQuizEn;

  useEffect(() => {
    setIsSelected(location.pathname === topicPath || location.pathname === quizPath);
  }, [location.pathname, topicPath, quizPath]);

  const handleClick = () => {
    startAsGuestOrUser({
      currentUser,
      isLoggedIn,
      cookieLimit,
      setLimitCookie,
      signInWithGoogle,
      navigateTo: topicPath,
      navigate
    })
  }


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

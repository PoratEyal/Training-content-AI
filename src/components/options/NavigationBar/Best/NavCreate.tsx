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

const NavOptCreate = () => {

  const { t, lang } = useLanguage();
  const { cookieLimit, setLimitCookie } = useCookiesContext();
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isLoggedIn } = useAuthContext()
  const { signInWithGoogle } = useSignIn()

  const homePath = route[`bestHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.bestHomePageEn;
  const quizPath = route[`bestQuiz${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.bestQuizEn;

  useEffect(() => {
    setIsSelected(location.pathname === homePath || location.pathname === quizPath);
  }, [location.pathname, homePath, quizPath]);

  const handleClick = () => {
    startAsGuestOrUser({
      currentUser,
      isLoggedIn,
      cookieLimit,
      setLimitCookie,
      signInWithGoogle,
      navigateTo: homePath,
      navigate
    })
  }


  return (
    <div
      onClick={handleClick}
      className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
    >
      <Icons.magic className={styles.icon} />
      <span className={styles.text}>{t("bestNavbar.create")}</span>
    </div>
  );
};

export default NavOptCreate;

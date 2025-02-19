import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import route from "../../router/route.json";
import useSignIn from "../../hooks/useSignIn";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import { NEED_TO_LOGIN } from "../../models/constants/cookie";
import ContinueWithAI from "../../components/titles/ContinueWithAI/ContinueWithAI";
import { isMoreThanADayAfter, isValidDateFormat } from "../../utils/time";
import Session from "../../utils/sessionStorage";
import { SessionKey } from "../../models/enum/storage";
import StartBtn from "../../components/StartBtn/StartBtn";
import PageLoading from "../../components/Loading/PageLoading/PageLoading";
import helmet from "../../models/resources/helmet.json";
import { useCookiesContext } from "../../context/CookiesContext";
import { SignInStatus } from "../../models/enum/registrationStatus";
import { HOME_AD_SLOT } from "../../models/constants/adsSlot";
import AboutUsCollapse from "../../components/AboutUsCollapse/AboutUsCollapse";
import { useStaticContentContext } from "../../context/StaticContentContext";
import { useSaveContext } from "../../context/SavedContext";
import LanguageSwitcherPopup from "../../components/LanguageSwitcherPopup/LanguageSwitcherPopup";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.css";

function Home() {
  const { t } = useTranslation();
  const { cookieLimit, setLimitCookie, cookieRememberMe } = useCookiesContext();
  const navigate = useNavigate();
  const { currentUser, isLoggedIn } = useAuthContext();

  const { useFetchSubjectsData } = useStaticContentContext();
  const { useFetchSavedData } = useSaveContext();
  useFetchSubjectsData();
  useFetchSavedData();

  const [rememberMe, setRememberMe] = useState<SignInStatus>(SignInStatus.NEW_ACCESS);

  const handleStart = () => {
    const navigateTo: string | undefined = Session.get(SessionKey.NAVIGATE);
    Session.remove(SessionKey.NAVIGATE);
    if (navigateTo) navigate(navigateTo);
  };

  const { signInWithGoogle, isLoading, btnDisabled } = useSignIn(handleStart);

  useEffect(() => {
    if (rememberMe === SignInStatus.NEW_ACCESS) {
      setRememberMe(cookieRememberMe ? SignInStatus.REMEMBER : SignInStatus.NOT_REMEMBER);
    }
  }, [isLoggedIn, currentUser]);

  const navigateAndSetCookieDate = (navigateTo: string) => {
    setLimitCookie(new Date().toString());
    navigate(navigateTo);
  };

  const guestSignInOrNavigate = (limitDate: string, navigateTo: string) => {
    const isValidDate = isValidDateFormat(limitDate);
    if (isValidDate) {
      const isMoreThanDay = isMoreThanADayAfter(limitDate);
      if (isMoreThanDay) {
        signInWithGoogle();
      } else {
        navigateAndSetCookieDate(navigateTo);
      }
    }
  };

  const startAsGuestOrUser = (navigateTo: string) => {
    if (currentUser && isLoggedIn) {
      navigate(navigateTo);
      return;
    }

    Session.set(SessionKey.NAVIGATE, navigateTo);
    if (cookieLimit) {
      if (cookieLimit === NEED_TO_LOGIN) {
        signInWithGoogle();
      } else {
        guestSignInOrNavigate(cookieLimit, navigateTo);
      }
    } else {
      navigateAndSetCookieDate(navigateTo);
    }
  };

  return (
    <PageLayout
      path={route.home}
      title={helmet.home.title}
      content={helmet.home.content}
      hasHeader={{}} 
      hesAds={HOME_AD_SLOT}
      hasNavBar
      index={true}
    >
      <div className={styles.languageSwitcher}>
        <LanguageSwitcherPopup />
      </div>

      <div className={styles.logo_text_div}>
        <ContinueWithAI />
        <h2 className={styles.home_lable}>
          {t("home.slogan", "מותאם, פשוט ומהיר 🤟")}
        </h2>
      </div>

      {rememberMe === SignInStatus.REMEMBER && !isLoading && isLoggedIn && currentUser?.image ? (
        <section className={styles.button_section}>
          <StartBtn
            text={t("home.startAction", "יצירת פעולות")}
            onClick={() => startAsGuestOrUser(route.details)}
            isDisabled={btnDisabled}
          />
        </section>
      ) : rememberMe === SignInStatus.NOT_REMEMBER && !isLoading ? (
        <section className={styles.button_section}>
          <StartBtn
            text={t("home.startAction", "יצירת פעולות")}
            onClick={() => startAsGuestOrUser(route.details)}
            isDisabled={btnDisabled}
          />
        </section>
      ) : (
        <div className={styles.button_section_loading}>
          <PageLoading />
        </div>
      )}

      <div className={styles.about_div}>
        <AboutUsCollapse>
          <p>
            {t(
              "home.aboutText",
              "ActivityWiz הוא אתר ליצירת פעולות לנוער. תוכלו לבחור מתוך מאגר של פעולות מוכנות מראש או להשתמש בבינה מלאכותית ליצירת פעולות מותאמות אישית, המתאימות בדיוק לצרכים שלכם. האתר מיועד למדריכים המחפשים רעיונות ודרכים חדשות להעשרת החוויה החינוכית והחברתית."
            )}
          </p>
        </AboutUsCollapse>
      </div>
    </PageLayout>
  );
}

export default Home;

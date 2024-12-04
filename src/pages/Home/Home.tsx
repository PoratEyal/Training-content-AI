import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import route from "../../router/route.json";
import useSignIn from "../../hooks/useSignIn";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import {
  COOKIE_LIMIT_KEY,
  GUEST_LIMIT_VALUE,
  // Removed POPUP_REVIEW, VISIT_COUNT_KEY, CookieOptions imports
} from "../../models/constants/cookie";
import ContinueWithAI from "../../components/titles/ContinueWithAI/ContinueWithAI";
import { isMoreThanADayAfter, isValidDateFormat } from "../../utils/time";
import Session from "../../utils/sessionStorage";
import { LocalKey, SessionKey } from "../../models/enum/storage";
import StartBtn from "../../components/StartBtn/StartBtn";
import LinkBtn from "../../components/LinkBtn/LinkBtn";
import { useEffect, useState } from "react";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import helmet from "../../models/resources/helmet.json";
import Local from "../../utils/localStorage";

function Home() {
  const {
    currentUser,
    isLoggedIn,
    cookies: authCookies,
    setLimitCookie,
  } = useAuthContext();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isRememberMe: string | undefined = Local.get(LocalKey.REMEMBER_ME);
    let timeoutId: NodeJS.Timeout;

    if (isRememberMe) {
      if (isLoggedIn) {
        setIsUserLoggedIn(false);
      } else {
        timeoutId = setTimeout(() => {
          setIsUserLoggedIn(false);
        }, 4000);
      }
    } else setIsUserLoggedIn(false);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoggedIn]);

  const handleStart = () => {
    const navigateTo: string | undefined = Session.get(SessionKey.NAVIGATE);
    Session.remove(SessionKey.NAVIGATE);
    navigateTo && navigate(navigateTo);
  };

  const { signInWithGoogle, isLoading, btnDisabled } = useSignIn(handleStart);

  const navigateAndSetCookieDate = (navigateTo: string) => {
    setLimitCookie(new Date().toString());
    navigate(navigateTo);
  };

  const startAsGuestOrUser = (navigateTo: string) => {
    if (currentUser && isLoggedIn) {
      navigate(navigateTo);
      return;
    }

    Session.set(SessionKey.NAVIGATE, navigateTo);
    let limitDate = authCookies[COOKIE_LIMIT_KEY];

    if (limitDate) {
      if (limitDate === GUEST_LIMIT_VALUE) {
        signInWithGoogle();
      } else {
        const isValidDate = isValidDateFormat(limitDate);
        if (isValidDate) {
          const isMoreThanDay = isMoreThanADayAfter(limitDate);

          if (isMoreThanDay) signInWithGoogle();
          else navigateAndSetCookieDate(navigateTo);
        }
      }
    } else navigateAndSetCookieDate(navigateTo);
  };

  return (
    <PageLayout
      path={route.home}
      hasFooter
      title={helmet.home.title}
      content={helmet.home.content}
    >

      <div className={styles.logo_text_div}>
        <ContinueWithAI />

        <h1 className={styles.home_lable}>יצירת פעולות: מותאם, פשוט ומהיר 🤟</h1>
      </div>

      {isUserLoggedIn || isLoading ? (
        <div className={styles.button_section_loading}>
          <SmallLoading />
        </div>
      ) : (
        <section className={styles.button_section}>
          <StartBtn
            text="צרו פעולות חדשות"
            onClick={() => startAsGuestOrUser(route.details)}
            isDisabled={btnDisabled}
          />
          <LinkBtn
            text="צפו בפעולות מוכנות"
            onClick={() => startAsGuestOrUser(route.content)}
            isDisabled={btnDisabled}
          />
        </section>
      )}
    </PageLayout>
  );
}

export default Home;

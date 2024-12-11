import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import route from "../../router/route.json";
import useSignIn from "../../hooks/useSignIn";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import {
  COOKIE_LIMIT_KEY,
  NEED_TO_LOGIN,
  POPUP_REVIEW,
  VISIT_COUNT_KEY,
  CookieOptions,
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
import { useCookies } from "react-cookie";
import ReviewPopup from "../../components/ReviewPopup/ReviewPopup";

function Home() {
  const {
    currentUser,
    isLoggedIn,
    cookies: authCookies,
    setLimitCookie,
    isPopupVisible,
    handlePopupClose,
    setIsPopupVisible,
  } = useAuthContext();

  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(true);
  const [cookies, setCookie] = useCookies([POPUP_REVIEW, VISIT_COUNT_KEY]);

  const handleStart = () => {
    const navigateTo: string | undefined = Session.get(SessionKey.NAVIGATE);
    Session.remove(SessionKey.NAVIGATE);
    if (navigateTo) navigate(navigateTo);
  };

  const { signInWithGoogle, isLoading } = useSignIn(handleStart);
  const btnDisabled = isLoading || !currentUser?.image;

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
    } else {
      setIsUserLoggedIn(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoggedIn]);

  // Run once to increment visit count and possibly show popup
  useEffect(() => {
    let visitCount = parseInt(cookies[VISIT_COUNT_KEY] || "0", 10);
    if (isNaN(visitCount)) {
      visitCount = 0;
    }

    visitCount += 1;
    setCookie(VISIT_COUNT_KEY, visitCount.toString(), CookieOptions);

    if (!cookies[POPUP_REVIEW] && visitCount >= 3) {
      const timer = setTimeout(() => {
        setIsPopupVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

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
    let limitDate = authCookies[COOKIE_LIMIT_KEY];
    if (limitDate) {
      if (limitDate === NEED_TO_LOGIN) {
        signInWithGoogle();
      } else {
        guestSignInOrNavigate(limitDate, navigateTo);
      }
    } else {
      navigateAndSetCookieDate(navigateTo);
    }
  };

  return (
    <PageLayout
      path={route.home}
      hasFooter
      title={helmet.home.title}
      content={helmet.home.content}
      hasHeader={{}}
    >
      {isPopupVisible && <ReviewPopup onClose={handlePopupClose} />}

      <div className={styles.logo_text_div}>
        <ContinueWithAI />
        <h1 className={styles.home_lable}>מותאם, פשוט ומהיר 🤟</h1>
      </div>

      {isUserLoggedIn || isLoading || !currentUser?.image ? (
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

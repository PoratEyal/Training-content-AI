//
// Home page, showing the app’s entry point
//
import styles from "./Youth.module.css"
import { useEffect, useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../../context/AuthContext"
import route from "../../../router/route.json"
import useSignIn from "../../../hooks/useSignIn"
import PageLayout from "../../../components/Layout/PageLayout/PageLayout"
import { NEED_TO_LOGIN } from "../../../models/constants/cookie"
import { isMoreThanADayAfter, isValidDateFormat } from "../../../utils/time"
import Session from "../../../utils/sessionStorage"
import { SessionKey } from "../../../models/enum/storage"
import StartBtn from "../../../components/StartBtn/StartBtn"
import PageLoading from "../../../components/Loading/PageLoading/PageLoading"
import { useCookiesContext } from "../../../context/CookiesContext"
import { SignInStatus } from "../../../models/enum/registrationStatus"
import { HOME_AD_SLOT } from "../../../models/constants/adsSlot"
import AboutUsCollapse from "../../../components/AboutUsCollapse/AboutUsCollapse"
import { useStaticContentContext } from "../../../context/StaticContentContext"
import { useSaveContext } from "../../../context/SavedContext"
import { useLanguage } from "../../../i18n/useLanguage"
import { buildHomeSchema } from "../../../models/schemaOrg"
import ContinueWithAI from "../../../components/titles/ContinueWithAI/ContinueWithAI"

function Home() {
  const { t, dir, lang } = useLanguage()
  const { cookieLimit, setLimitCookie, cookieRememberMe } = useCookiesContext()
  const navigate = useNavigate()
  const { currentUser, isLoggedIn } = useAuthContext()

  const homeSchema = useMemo(
    () => buildHomeSchema(lang, t("home.slogan")),
    [lang, t]
  )

  const { useFetchSubjectsData } = useStaticContentContext()
  const { useFetchSavedData } = useSaveContext()
  useFetchSubjectsData()
  useFetchSavedData()

  const [rememberMe, setRememberMe] = useState<SignInStatus>(SignInStatus.NEW_ACCESS)

  const youthDetailsPath = route[`youthDetails${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthDetailsEn;

  const handleStart = () => {
    const navigateTo: string | undefined = Session.get(SessionKey.NAVIGATE)
    Session.remove(SessionKey.NAVIGATE)
    if (navigateTo) navigate(navigateTo)
  }

  const { signInWithGoogle, isLoading, btnDisabled } = useSignIn(handleStart)

  useEffect(() => {
    if (rememberMe === SignInStatus.NEW_ACCESS) {
      setRememberMe(cookieRememberMe ? SignInStatus.REMEMBER : SignInStatus.NOT_REMEMBER)
    }
  }, [isLoggedIn, currentUser, cookieRememberMe, rememberMe])

  // Only set cookie if date doesn't already exist, to allow future time comparisons
  const navigateAndSetCookieDate = (navigateTo: string) => {
    if (!cookieLimit) {
      setLimitCookie(new Date().toString());
    }
    navigate(navigateTo);
  };


  const guestSignInOrNavigate = (limitDate: string, navigateTo: string) => {
    const isValidDate = isValidDateFormat(limitDate)
    if (isValidDate) {
      const isMoreThanDay = isMoreThanADayAfter(limitDate)
      if (isMoreThanDay) {
        signInWithGoogle()
      } else {
        navigateAndSetCookieDate(navigateTo)
      }
    }
  }

  const startAsGuestOrUser = (navigateTo: string) => {
    if (currentUser && isLoggedIn) {
      navigate(navigateTo)
      return
    }

    Session.set(SessionKey.NAVIGATE, navigateTo)
    if (cookieLimit) {
      if (cookieLimit === NEED_TO_LOGIN) {
        signInWithGoogle()
      } else {
        guestSignInOrNavigate(cookieLimit, navigateTo)
      }
    } else {
      navigateAndSetCookieDate(navigateTo)
    }
  }

  return (
    <PageLayout
      id="home"
      projectType={"youth"}
      hasHeader={{}}
      hasAds={HOME_AD_SLOT}
      index={true}
      hasNavBar
    >
      <script type="application/ld+json">
        {JSON.stringify(homeSchema)}
      </script>

      <div className={styles.logo_text_div}>
        <ContinueWithAI />
        <div className={styles.home_lable} style={{ direction: dir }}>
          <span>{t("home.slogan")}</span>
        </div>
      </div>

      {/* 🔧 Hidden top-right button for admin to navigate to /practice */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 30,
          height: 30,
          zIndex: 9999,
          background: "transparent",
        }}
        onClick={() => {
          window.location.href = "/practice";
        }}
      />


      {rememberMe === SignInStatus.REMEMBER &&
        !isLoading &&
        isLoggedIn &&
        currentUser?.image ? (
        <section className={styles.button_section}>
          <StartBtn
            text={t("home.startAction")}
            onClick={() => startAsGuestOrUser(youthDetailsPath)}
            isDisabled={btnDisabled}
          />
        </section>
      ) : rememberMe === SignInStatus.NOT_REMEMBER && !isLoading ? (
        <section className={styles.button_section}>
          <StartBtn
            text={t("home.startAction")}
            onClick={() => startAsGuestOrUser(youthDetailsPath)}
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
          <p>{t("home.youthAboutText")}</p>
        </AboutUsCollapse>
      </div>
    </PageLayout>
  )
}

export default Home

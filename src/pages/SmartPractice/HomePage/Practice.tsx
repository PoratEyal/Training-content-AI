//
// Home page
//
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import styles from "./Practice.module.css";
import { useAuthContext } from "../../../context/AuthContext";
import { useCookiesContext } from "../../../context/CookiesContext";
import { useLanguage } from "../../../i18n/useLanguage";
import useSignIn from "../../../hooks/useSignIn";
import { ProductType } from "../../../context/ProductType";
import { NEED_TO_LOGIN } from "../../../models/constants/cookie";
import { PRACTICE_HOME_AD_SLOT } from "../../../models/constants/adsSlot";
import { buildHomeSchema } from "../../../models/schemaOrg";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import PageLoading from "../../../components/Loading/PageLoading/PageLoading";
import StartBtn from "../../../components/StartBtn/StartBtn";
import AboutUsCollapse from "../../../components/AboutUsCollapse/AboutUsCollapse";
import ContinueWithAI from "../../../components/titles/ContinueWithAI/ContinueWithAI";
import { startAsGuestOrUser } from "../../../utils/startAsGuestOrUser";


function PracticeHomePage() {

  const { t, dir, lang } = useLanguage()
  const { cookieLimit, setLimitCookie } = useCookiesContext()
  const navigate = useNavigate()
  const { currentUser, isLoggedIn } = useAuthContext()
  const { signInWithGoogle } = useSignIn()

  const homeSchema = useMemo(() => buildHomeSchema(lang, t("home.slogan")), [lang, t])
  const topicPath = route[`practiceTopic${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceTopicEn
  const shouldBlockUI = !isLoggedIn && cookieLimit === NEED_TO_LOGIN

//  const SetCookieDate4Debug = () => { // Temporary Debug function
//    if (cookieLimit) {
//      const lastWeek = new Date()
//      lastWeek.setDate(lastWeek.getDate() - 7)
//      setLimitCookie(lastWeek.toString())
//    }
//  }

  return (
    <PageLayout
      id="practiceHome"
      productType={ProductType.Practice}
      hasHeader={{}}
      hasAds={PRACTICE_HOME_AD_SLOT}
      index={true}
      hasNavBar={!shouldBlockUI}
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

      {/* 🔧 Hidden top-right button for admin to navigate to /youth */}
      {/*
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
          SetCookieDate4Debug()
          // window.location.href = "/youth"
        }}
      />
      */}      

      {shouldBlockUI ? (
        <div className={styles.button_section_loading}>
          <PageLoading />
        </div>
      ) : (
        <section className={styles.button_section}>
          <StartBtn
            text={t("home.practiceStartAction")}
            onClick={() =>
              startAsGuestOrUser({
                currentUser,
                isLoggedIn,
                cookieLimit,
                setLimitCookie,
                signInWithGoogle,
                navigateTo: topicPath,
                navigate,
              })
            }
            isDisabled={shouldBlockUI}
          />
        </section>
      )}

      <div className={styles.about_div}>
        <AboutUsCollapse>
          <p>{t("home.practiceAboutText")}</p>
        </AboutUsCollapse>
      </div>

    </PageLayout>
  )
}

export default PracticeHomePage

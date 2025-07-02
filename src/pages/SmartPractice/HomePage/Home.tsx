//
// Home page
//
import { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import styles from "./Home.module.css";
import { useAuthContext } from "../../../context/AuthContext";
import { useCookiesContext } from "../../../context/CookiesContext";
import { useLanguage } from "../../../i18n/useLanguage";
import useSignIn from "../../../hooks/useSignIn";
import { ProductType } from "../../../context/ProductType";
import { GUEST_BLOCK_MustLogin } from "../../../models/constants/cookie";
import { PRACTICE_AD_SLOT } from "../../../models/constants/adsSlot";
import { buildHomeSchema } from "../../../models/schemaOrg";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import PageLoading from "../../../components/Loading/PageLoading/PageLoading";
import StartBtn from "../../../components/StartBtn/StartBtn";
import AboutUsCollapse from "../../../components/AboutUsCollapse/AboutUsCollapse";
import ContinueWithAI from "../../../components/titles/ContinueWithAI/ContinueWithAI";
import { startAsGuestOrUser } from "../../../utils/startAsGuestOrUser";
import { useContentContext } from "../../../context/ContentContext";
import { ProductPages } from "../../../models/enum/pages";


function PracticeHomePage() {

  const { t, dir, lang } = useLanguage()
  const { cookieLimit, setLimitCookie } = useCookiesContext()
  const navigate = useNavigate()
  const { currentUser, isLoggedIn, loading } = useAuthContext();
  const { signInWithGoogle } = useSignIn()
  const { setCurrentPage } = useContentContext()

  const homeSchema = useMemo(() => buildHomeSchema(lang, t("home.slogan")), [lang, t])
  const topicPath = route[`practiceTopic${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceTopicEn

  // UI is blocked (Loader is displayed) when we are not logged-in but we need to be logged in according to cookie
  const shouldBlockUI = useMemo(() => {
    return !isLoggedIn && cookieLimit === GUEST_BLOCK_MustLogin;
  }, [isLoggedIn, cookieLimit]);
  
  useEffect(() => {
    setCurrentPage(ProductPages.PAGE_PracticeHome);
    sessionStorage.setItem("lastVisitedPage", ProductPages.PAGE_PracticeHome);
  }, []);

  return (
    <PageLayout
      id="practiceHome"
      productType={ProductType.Practice}
      hasHeader={{}}
      hasAds={PRACTICE_AD_SLOT}
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

      {loading ? (
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
          <p>{t("aboutUs.practiceAboutText")}</p>
        </AboutUsCollapse>
      </div>

    </PageLayout>
  )
}

export default PracticeHomePage

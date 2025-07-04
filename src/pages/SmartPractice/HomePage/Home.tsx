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
import { PRACTICE_AD_SLOT } from "../../../models/constants/adsSlot";
import { buildHomeSchema } from "../../../models/schemaOrg";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import PageLoading from "../../../components/Loading/PageLoading/PageLoading";
import MainBtn from "../../../components/MainBtn/MainBtn"
import AboutUsCollapse from "../../../components/AboutUsCollapse/AboutUsCollapse";
import ContinueWithAI from "../../../components/titles/ContinueWithAI/ContinueWithAI";
import { startAsGuestOrUser } from "../../../utils/startAsGuestOrUser";
import { useContentContext } from "../../../context/ContentContext";
import { ProductPages } from "../../../models/enum/pages";
import { StorageKey } from "../../../models/enum/storage";


function PracticeHomePage() {

  const { t, dir, lang } = useLanguage()
  const { cookieLimit, setLimitCookie } = useCookiesContext()
  const navigate = useNavigate()
  const { currentUser, isLoggedIn, loading } = useAuthContext();
  const { signInWithGoogle } = useSignIn()
  const { setCurrentPage } = useContentContext()

  const homeSchema = useMemo(() => buildHomeSchema(lang, t("home.slogan")), [lang, t])
  const topicPath = route[`practiceTopic${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceTopicEn

  useEffect(() => {
    setCurrentPage(ProductPages.PAGE_PracticeHome);
    sessionStorage.setItem(StorageKey.LAST_PAGE, ProductPages.PAGE_PracticeHome);
  }, []);

  return (
    <PageLayout
      id="practiceHome"
      productType={ProductType.Practice}
      hasHeader={{}}
      hasAds={PRACTICE_AD_SLOT}
      index={true}
      hasNavBar={!loading}
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
          <MainBtn
            text={t("home.practiceStartAction")}
            func={() =>
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
            height={48}
            isDisabled={false}
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

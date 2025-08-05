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
import { BEST_AD_SLOT } from "../../../models/constants/adsSlot";
import { buildHomeSchema } from "../../../models/schemaOrg";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import PageLoading from "../../../components/Loading/PageLoading/PageLoading";
import MainBtn from "../../../components/MainBtn/MainBtn"
import AboutUsCollapse from "../../../components/AboutUsCollapse/AboutUsCollapse";
import HomePageTitle from "../../../components/titles/bestHomePageTitle/bestHomePageTitle";
import { startAsGuestOrUser } from "../../../utils/startAsGuestOrUser";
import { useContentContext } from "../../../context/ContentContext";
import { ProductPages } from "../../../models/enum/pages";
import { StorageKey } from "../../../models/enum/storage";

function BestHomePage() {

  const { t, dir, lang } = useLanguage()
  const { cookieLimit, setLimitCookie } = useCookiesContext()
  const navigate = useNavigate()
  const { currentUser, isLoggedIn, loading } = useAuthContext();
  const { signInWithGoogle } = useSignIn()
  const { setCurrentPage } = useContentContext()

  const bestSchema = useMemo(() => buildHomeSchema(lang, t("home.slogan")), [lang, t])
  const besthomePath = route[`bestHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.bestHomePageEn

  useEffect(() => {
    setCurrentPage(ProductPages.PAGE_WordsHome);
    sessionStorage.setItem(StorageKey.LAST_PAGE, ProductPages.PAGE_WordsHome);
  }, []);


  return (
    <PageLayout
      id="bestHome"
      productType={ProductType.Best}
      hasHeader={{}}
      hasAds={BEST_AD_SLOT}
      index={true}
      hasNavBar={!loading}
    >

      <script type="application/ld+json">
        {JSON.stringify(bestSchema)}
      </script>

      <div className={styles.logo_text_div}>
        <HomePageTitle />
      </div>

      {loading ? (
        <div className={styles.button_section_loading}>
          <PageLoading />
        </div>
      ) : (
        <section className={styles.button_section}>
          <MainBtn
            text={t("home.bestStartAction")}
            func={() =>
              startAsGuestOrUser({
                currentUser,
                isLoggedIn,
                cookieLimit,
                setLimitCookie,
                signInWithGoogle,
                navigateTo: besthomePath,
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
          <p>{t("aboutUs.bestAboutText")}</p>
        </AboutUsCollapse>
      </div>

    </PageLayout>
  )
}

export default BestHomePage

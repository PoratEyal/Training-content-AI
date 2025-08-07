import AboutUsCollapse from "../../../components/AboutUsCollapse/AboutUsCollapse"
import ContinueWithAI from "../../../components/titles/ContinueWithAI/ContinueWithAI"
import PageLayout from "../../../components/Layout/PageLayout/PageLayout"
import PageLoading from "../../../components/Loading/PageLoading/PageLoading"
import StartBtn from "../../../components/StartBtn/StartBtn"
import { useAuthContext } from "../../../context/AuthContext"
import { useCookiesContext } from "../../../context/CookiesContext"
import { useSaveContext } from "../../../context/SavedContext"
import { useStaticContentContext } from "../../../context/StaticContentContext"
import { ProductType } from "../../../context/ProductType"
import { useLanguage } from "../../../i18n/useLanguage"
import { EVENT_AD_SLOT } from "../../../models/constants/adsSlot"
import { buildHomeSchema } from "../../../models/schemaOrg"
import route from "../../../router/route.json"
import useSignIn from "../../../hooks/useSignIn"
import { useNavigate } from "react-router-dom"
import { useMemo } from "react"
import { startAsGuestOrUser } from "../../../utils/startAsGuestOrUser"
import styles from "./Home.module.css"
import { useContentContext } from "../../../context/ContentContext"
import { ProductPages } from "../../../models/enum/pages"
import { useEffect } from "react"
import { StorageKey } from "../../../models/enum/storage";


function EventHomePage() {

  const { signInWithGoogle } = useSignIn()
  const navigate = useNavigate()
  const { t, dir, lang } = useLanguage()
  const { cookieLimit, setLimitCookie } = useCookiesContext()
  const { currentUser, isLoggedIn, loading } = useAuthContext();
  const { setCurrentPage } = useContentContext()
  const { useFetchSubjectsData } = useStaticContentContext()
  const { useFetchSavedData } = useSaveContext()
  useFetchSubjectsData()
  useFetchSavedData()

  const eventHomeSchema = useMemo(() => buildHomeSchema(lang, t("home.slogan")), [lang, t])
  const eventDetailsPath = route[`eventDetails${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.eventDetailsEn

  useEffect(() => {
    setCurrentPage(ProductPages.PAGE_EventHome);
    sessionStorage.setItem(StorageKey.LAST_PAGE, ProductPages.PAGE_EventHome);
  }, []);


  return (
    <PageLayout
      id="eventHome"
      productType={ProductType.Event}
      hasHeader={{}}
      hasAds={EVENT_AD_SLOT}
      index={true}
      hasNavBar={!loading}
    >
      <script type="application/ld+json">{JSON.stringify(eventHomeSchema)}</script>

      <div className={styles.slogan_big}>
        <ContinueWithAI />
        <div className={styles.slogan_small} style={{ direction: dir }}>
          <span>{t("home.slogan")}</span>
        </div>
      </div>

      {loading ? (
        <div className={styles.submit_btn_loading}>
          <PageLoading />
        </div>
      ) : (
        <section className={styles.submit_btn}>
          <StartBtn
            text={t("home.eventStartAction")}
            onClick={() =>
              startAsGuestOrUser({
                currentUser,
                isLoggedIn,
                cookieLimit,
                setLimitCookie,
                signInWithGoogle,
                navigateTo: eventDetailsPath,
                navigate,
              })
            }
            isDisabled={false}
          />
        </section>
      )}

      <div className={styles.about_div}>
        <AboutUsCollapse>
          <p>{t("aboutUs.eventAboutText")}</p>
        </AboutUsCollapse>
      </div>
    </PageLayout>
  )
}

export default EventHomePage

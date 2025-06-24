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
import { GUEST_BLOCK_MustLogin } from "../../../models/constants/cookie"
import { HOME_AD_SLOT } from "../../../models/constants/adsSlot"
import { buildHomeSchema } from "../../../models/schemaOrg"
import route from "../../../router/route.json"
import useSignIn from "../../../hooks/useSignIn"
import { useNavigate } from "react-router-dom"
import { useMemo } from "react"
import { startAsGuestOrUser } from "../../../utils/startAsGuestOrUser"
import styles from "./Youth.module.css"

function YouthHomePage() {

  const { t, dir, lang } = useLanguage()
  const { cookieLimit, setLimitCookie } = useCookiesContext()
  const navigate = useNavigate()
  const { currentUser, isLoggedIn } = useAuthContext()
  const { signInWithGoogle } = useSignIn()
  
  const { useFetchSubjectsData } = useStaticContentContext()
  const { useFetchSavedData } = useSaveContext()
  useFetchSubjectsData()
  useFetchSavedData()

  const homeSchema = useMemo(() => buildHomeSchema(lang, t("home.slogan")), [lang, t])
  const youthDetailsPath = route[`youthDetails${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthDetailsEn
  const shouldBlockUI = !isLoggedIn && cookieLimit === GUEST_BLOCK_MustLogin

  return (
    <PageLayout
      id="home"
      productType={ProductType.Youth}
      hasHeader={{}}
      hasAds={HOME_AD_SLOT}
      index={true}
      hasNavBar={!shouldBlockUI}
    >
      <script type="application/ld+json">{JSON.stringify(homeSchema)}</script>

      <div className={styles.logo_text_div}>
        <ContinueWithAI />
        <div className={styles.home_lable} style={{ direction: dir }}>
          <span>{t("home.slogan")}</span>
        </div>
      </div>

      {shouldBlockUI ? (
        <div className={styles.button_section_loading}>
          <PageLoading />
        </div>
      ) : (
        <section className={styles.button_section}>
          <StartBtn
            text={t("home.startAction")}
            onClick={() =>
              startAsGuestOrUser({
                currentUser,
                isLoggedIn,
                cookieLimit,
                setLimitCookie,
                signInWithGoogle,
                navigateTo: youthDetailsPath,
                navigate,
              })
            }
            isDisabled={shouldBlockUI}
          />
        </section>
      )}

      <div className={styles.about_div}>
        <AboutUsCollapse>
          <p>{t("home.youthAboutText")}</p>
        </AboutUsCollapse>
      </div>
    </PageLayout>
  )
}

export default YouthHomePage

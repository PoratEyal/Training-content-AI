//
// Home page
//
import { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import route from "../../../router/route.json";
import styles from "./Home.module.css";
import { useAuthContext } from "../../../context/AuthContext";
import { useCookiesContext } from "../../../context/CookiesContext";
import { useLanguage } from "../../../i18n/useLanguage";
import useSignIn from "../../../hooks/useSignIn";
import { ProductType } from "../../../context/ProductType";
import { WORDS_AD_SLOT } from "../../../models/constants/adsSlot";
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
import { logEvent } from "../../../utils/logEvent";

function WordsHomePage() {

  const { t, dir, lang } = useLanguage()
  const { cookieLimit, setLimitCookie } = useCookiesContext()
  const navigate = useNavigate()
  const { currentUser, isLoggedIn, loading } = useAuthContext();
  const { signInWithGoogle } = useSignIn()
  const { setCurrentPage } = useContentContext()

  const homeSchema = useMemo(() => buildHomeSchema(lang, t("home.slogan")), [lang, t])
  const wordsTopicPath = route[`wordsTopic${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsTopicEn

  useEffect(() => {
    setCurrentPage(ProductPages.PAGE_WordsHome);
    sessionStorage.setItem(StorageKey.LAST_PAGE, ProductPages.PAGE_WordsHome);
  }, []);


  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    try {
      const originalSpeak = window.responsiveVoice?.speak;
      if (!originalSpeak) return;

      // Disable direct use
      window.responsiveVoice.speak = () => { };

      // Controlled wrapper
      window.speakControlled = (text, langCode) => {
        if (typeof text !== "string" || !text.trim()) return;

        const voices = {
          he: "Hebrew Male",
          en: "US English Female",
          ar: "Arabic Male",
          es: "Spanish Latin American Female",
          fr: "French Female",
          it: "Italian Female",
          de: "Deutsch Male",
          ko: "Korean Male",
          zh: "Chinese Male",
          ro: "Romanian Female",
          el: "Greek Female",
          th: "Thai Female",
          nl: "Dutch Female",
          hu: "Hungarian Female",
          cs: "Czech Female",
        };
        const selectedVoice = voices[langCode] || "US English Female";
        originalSpeak(text, selectedVoice, { rate: 0.8 });
      };
    } catch (e) {
      logEvent("responsiveVoice setup error", currentUser?.email);
    }
  }, []);


  return (
    <PageLayout
      id="wordsHome"
      productType={ProductType.Words}
      hasHeader={{}}
      hasAds={WORDS_AD_SLOT}
      index={true}
      hasNavBar={!loading}
    >

      <script type="application/ld+json">
        {JSON.stringify(homeSchema)}
      </script>

      <div className={styles.slogan_big}>
        <ContinueWithAI />
        <div className={styles.slogan_small} style={{ direction: dir }}>
          <span>{t("common.slogan")}</span>
        </div>
      </div>

      {loading ? (
        <div className={styles.submit_btn_loading}>
          <PageLoading />
        </div>
      ) : (
        <section className={styles.submit_btn}>
          <MainBtn
            text={t("words.home.startAction")}
            func={() =>
              startAsGuestOrUser({
                currentUser,
                isLoggedIn,
                cookieLimit,
                setLimitCookie,
                signInWithGoogle,
                navigateTo: wordsTopicPath,
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
          <p>{t("aboutUs.wordsAboutText")}</p>
        </AboutUsCollapse>
      </div>

    </PageLayout>
  )
}

export default WordsHomePage

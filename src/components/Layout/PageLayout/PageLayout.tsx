import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { StorageKey } from "../../../models/enum/storage";
import { useLanguage } from "../../../i18n/useLanguage";
import { getContent, getTitle } from "../../../models/resources/helmet";
import { WEBSITE_URL } from "../../../models/constants";
import { HelmetPage } from "../../../models/types/common";
import { ProductType } from "../../../context/ProductType";
import { logEvent } from "../../../utils/logEvent";
import { useShareTextOrLink } from "../../../utils/share"
import Header from "../Header/Header";
import YouthNavigationBar from "../NavigationBar/YouthNavigationBar";
import PracticeNavigationBar from "../NavigationBar/PracticeNavigationBar";
import WordsNavigationBar from "../NavigationBar/WordsNavigationBar";
import AdsSmall from "../../ads/AdsSmall/AdsSmall";
import AdsBig from "../../ads/AdsBig/AdsBig";
import styles from "./PageLayout.module.css";
import { Icons } from "../../Icons";

type PageLayoutProps = {
  id: HelmetPage;
  productType: ProductType;
  hasGreenBackground?: boolean;
  hasHeader?:
  | {
    goBack?: () => void;
    isBlur?: boolean;
    hasTitle?: string;
  }
  | undefined;
  hasAds?: string;
  hasNavBar?: boolean;
  index?: boolean;
  children: React.ReactNode;
  title?: string;
};

function PageLayout({
  id,
  productType,
  children,
  hasGreenBackground = false,
  hasHeader = undefined,
  hasAds = "",
  hasNavBar = false,
  index = true,
  title = "",
}: PageLayoutProps) {
  const { t, lang, dir } = useLanguage();
  const location = useLocation();
  const share = useShareTextOrLink()

  // Force canonical to /[lang]/youth for language root pages (/en, /he, etc.) to avoid duplication
  // in the future if we will have a general homepage we will be able to remove it and just leave:
  // const canonicalUrl = `${WEBSITE_URL}${location.pathname}`;
  const isLangRoot = /^\/(he|en|es|ar)\/?$/.test(location.pathname)
  const isLangYouth = /^\/(he|en|es|ar)\/youth\/?$/.test(location.pathname)
  const canonicalUrl =
    isLangRoot || isLangYouth
      ? `${WEBSITE_URL}${location.pathname.replace(/\/(he|en|es|ar)\/?$/, "/$1/youth")}`
      : `${WEBSITE_URL}${location.pathname}`

  // Set <html lang> and <html dir> directly
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const restOfPath = location.pathname.replace(/^\/(he|en|es|ar)/, "") || "/";

  const alternateHe = `${WEBSITE_URL}/he${restOfPath}`;
  const alternateEn = `${WEBSITE_URL}/en${restOfPath}`;
  const alternateEs = `${WEBSITE_URL}/es${restOfPath}`;
  const alternateAr = `${WEBSITE_URL}/ar${restOfPath}`;

  const pageTitle = getTitle(id, lang, title);
  const pageDescription = getContent(id, lang, title);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="language" content={lang} />

        {/* Open Graph metadata */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${WEBSITE_URL}/logo512.png`} />

        {/* Twitter metadata */}
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${WEBSITE_URL}/logo512.png`} />

        {/* Canonical and hreflang */}
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" href={alternateHe} hrefLang="he" />
        <link rel="alternate" href={alternateEn} hrefLang="en" />
        <link rel="alternate" href={alternateEs} hrefLang="es" />
        <link rel="alternate" href={alternateAr} hrefLang="ar" />
        <link rel="alternate" href={alternateEn} hrefLang="x-default" />

        {/* Robots */}
        <meta
          key="robots"
          name="robots"
          content={index ? "index, follow" : "noindex, follow"}
        />
      </Helmet>

      <section
        className={styles.pageContainer}
        style={{
          backgroundColor: (() => {
            if (!hasGreenBackground) return "var(--background-color)";
            if (productType === ProductType.Youth) return "var(--primary-color)";
            if (productType === ProductType.Practice) return "var(--practice-primary-color)";
            if (productType === ProductType.Words) return "var(--words-primary-color)";
            return "var(--background-color)";
          })(),
          direction: dir,
        }}
      >

        {/* Header Area */}
        {hasHeader ? (
          <Header
            goBack={hasHeader.goBack}
            isBlur={hasHeader.isBlur}
            hasTitle={hasHeader.hasTitle}
          />
        ) : null}

        {/* Main Page */}
        {children}

        {/* Ads Area */}
        {hasAds !== "" ? (() => {

          // Use case 1: Instructor is in the Practice product and wants to share a direct Practice link (with topic) to their group
          if (productType === ProductType.Practice && localStorage.getItem(StorageKey.USER_TYPE) === "instructor") {

            const topic = localStorage.getItem(StorageKey.PRACTICE_TOPIC);
            if (topic) {
              const handleBannerClick = () => {
                logEvent("practiceShare Banner Clicked", "");

                const encodedTopic = encodeURIComponent(topic);

                const shareText = t("articleOptions.share.practiceShareMessageInstructor")
                const shareTitle = t("common.practiceAppName")
                let shareUrl = `https://activitywiz.com/he/practice?topic=${encodedTopic}`
                share(t, shareTitle, shareText, shareUrl)

              };

              return (
                <div className={styles.customAdSlot} onClick={handleBannerClick} style={{ cursor: "pointer" }}>
                  <div className={styles.bannerWithIcon}>
                    <Icons.Share size={22} />
                    <span>{t("articleOptions.share.practiceShareBannerText")}</span>
                  </div>
                </div>
              );
            }
            return null;
          }

          // Use case 2: User in Youth Product + special case for instructor
          else if (location.pathname.includes("/he/youth/activity")) {

            const banners = ["/Practice/practiceBanner1.png", "/Practice/practiceBanner2.png", "/Practice/practiceBanner3.png", "/Practice/practiceBanner4.png"];
            const randomIndex = Math.floor(Math.random() * banners.length);
            const bannerImage = banners[randomIndex];

            const handleBannerClick = () => {

              logEvent(bannerImage, "");

              // pass the subject to Practice product
              const rawData = sessionStorage.getItem(StorageKey.YOUTH_ACTIVITY);
              if (rawData) {
                const activityObj = JSON.parse(rawData);
                localStorage.setItem(StorageKey.PRACTICE_TOPIC, activityObj.subject);
                localStorage.setItem(StorageKey.USER_TYPE, "instructor"); // Assumption: If the user is in the YOUTH product, they are acting as an instructor
              }

              window.open("https://activitywiz.com/he/practice", "_blank");
            };

            return (
              <div className={styles.customAdSlot} onClick={handleBannerClick} style={{ cursor: "pointer" }}>
                <img src={bannerImage} alt="ActivityWiz Practice" className={styles.customAdImage} />
              </div>
            );
          }

          else
            // Google Ads
            return <AdsSmall slot={hasAds} />;

        })() : null}


        {/* Navigation Area */}
        {hasNavBar ? (
          productType === ProductType.Practice ? (
            <PracticeNavigationBar />
          ) : productType === ProductType.Youth ? (
            <YouthNavigationBar />
          ) : productType === ProductType.Words ? (
            <WordsNavigationBar />
          ) : null
        ) : null}
      </section >
    </>
  );
}


export default PageLayout;

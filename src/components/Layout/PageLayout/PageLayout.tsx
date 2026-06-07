import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { StorageKey } from "../../../models/enum/storage";
import { useLanguage } from "../../../i18n/useLanguage";
import { getContent, getTitle } from "../../../models/resources/helmet";
import { WEBSITE_URL } from "../../../models/constants";
import { HelmetPage } from "../../../models/types/common";
import { ProductType } from "../../../context/ProductType";
import { useAuthContext } from "../../../context/AuthContext";
import { useShareTextOrLink } from "../../../utils/share"
import Header from "../Header/Header";
import YouthNavigationBar from "../NavigationBar/YouthNavigationBar";
import EventNavigationBar from "../NavigationBar/EventNavigationBar";
import PracticeNavigationBar from "../NavigationBar/PracticeNavigationBar";
import WordsNavigationBar from "../NavigationBar/WordsNavigationBar";
import AdsSmall from "../../ads/AdsSmall/AdsSmall";
import AdsBig from "../../ads/AdsBig/AdsBig";
import { Adsense } from "@ctrl/react-adsense";
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
  navDisabled?: boolean;
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
  navDisabled = false,
}: PageLayoutProps) {
  const { t, lang, dir } = useLanguage();
  const { currentUser } = useAuthContext();
  const location = useLocation();
  const share = useShareTextOrLink()
  const isLoggedIn = !!currentUser?.email;

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

  const restOfPath = location.pathname.replace(/^\/(he|en|es|ar|fr)/, "") || "/";

  const alternateHe = `${WEBSITE_URL}/he${restOfPath}`;
  const alternateEn = `${WEBSITE_URL}/en${restOfPath}`;
  const alternateEs = `${WEBSITE_URL}/es${restOfPath}`;
  const alternateFr = `${WEBSITE_URL}/fr${restOfPath}`;
  const alternateAr = `${WEBSITE_URL}/ar${restOfPath}`;

  const pageTitle = getTitle(id, lang, title);
  const pageDescription = getContent(id, lang, title);

  const path = location.pathname;
  const isYouthContent = /^\/(he|en|es|ar|fr)\/youth\/content(?:\/|$)/.test(path);

  //* Canonical and hreflang
  const linksForHelmet = isYouthContent
    ? [
      { rel: "canonical", href: canonicalUrl }, // content only in hebrew
      { rel: "alternate", href: alternateHe, hrefLang: "he" },
    ]
    : [
      { rel: "canonical", href: canonicalUrl },
      { rel: "alternate", href: alternateHe, hrefLang: "he" },
      { rel: "alternate", href: alternateEn, hrefLang: "en" },
      { rel: "alternate", href: alternateEs, hrefLang: "es" },
      { rel: "alternate", href: alternateFr, hrefLang: "fr" },
      { rel: "alternate", href: alternateAr, hrefLang: "ar" },
    ];

  return (
    <>
      <Helmet prioritizeSeoTags link={linksForHelmet}>
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

        {/* Robots */}
        <meta
          key="robots"
          name="robots"
          content={index ? "index, follow" : "noindex, follow"}
        />
      </Helmet>

      <div className={styles.layoutWrapper}>
        <div className={`${styles.sidebarAd} ${styles.leftAd}`}>
          {window.location.href.includes("localhost:3000") ? (
            <div style={{ width: "300px", height: "600px", backgroundColor: "#FFF1D8", border: "1px dashed #e7d8ba", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", color: "#8b8b8b" }}>
              מודעת צד (300x600)
            </div>
          ) : (
            <Adsense
              className="ads-sidebar-slot"
              client="ca-pub-9858822058074702"
              slot="6260212628"
              style={{ display: "inline-block", width: "300px", height: "600px" }}
            />
          )}
        </div>

        <section
          className={styles.pageContainer}
          style={{
            backgroundColor: (() => {
              if (!hasGreenBackground) return "var(--background-color)";
              if (productType === ProductType.Youth) return "var(--youth-primary-color)";
              if (productType === ProductType.Event) return "var(--event-primary-color)";
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

            // My Banner (Share Practice Product) in Practice Product
            if (path.includes("/practice/quiz")) {

              const topic = localStorage.getItem(StorageKey.PRACTICE_TOPIC); // if exist

              const handleBannerClick = () => {
                const encodedTopic = encodeURIComponent(topic || "");
                const shareTitle = t("common.practiceAppName")
                const shareUrl = `https://activitywiz.com/${lang}/practice?topic=${encodedTopic}`;
                const shareText = `${t("articleOptions.share.practiceShareMessageInstructor")}\n\n${topic}\n${shareUrl}`;
                share(t, shareTitle, shareText)
              };

              return (
                <div className={styles.customAdSlot} onClick={handleBannerClick} style={{ cursor: "pointer" }}>
                  <div className={styles.bannerWithIcon}>
                    <Icons.Share size={22} />
                    <span>{t("articleOptions.share.practiceShareBannerText")}</span>
                  </div>
                </div>
              );
              return null;
            }

            else
              // Google Ads
              if (window.location.href.includes("localhost:3000")) {
                return <div className="ads-small-slot" style={{ backgroundColor: "#FFF1D8" }} />;
              }
            return <AdsSmall slot={hasAds} />;

          })() : null}


          {/* Navigation Area */}
          {hasNavBar ? (
            <div style={{ pointerEvents: navDisabled ? "none" : "auto" }}>
              {productType === ProductType.Youth ? (
                <YouthNavigationBar />
              ) : productType === ProductType.Event ? (
                <EventNavigationBar />
              ) : productType === ProductType.Practice ? (
                <PracticeNavigationBar />
              ) : productType === ProductType.Words ? (
                <WordsNavigationBar />
              ) : null}
            </div>
          ) : null}
        </section >

        <div className={`${styles.sidebarAd} ${styles.rightAd}`}>
          {window.location.href.includes("localhost:3000") ? (
            <div style={{ width: "300px", height: "600px", backgroundColor: "#FFF1D8", border: "1px dashed #e7d8ba", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", color: "#8b8b8b" }}>
              מודעת צד (300x600)
            </div>
          ) : (
            <Adsense
              className="ads-sidebar-slot"
              client="ca-pub-9858822058074702"
              slot="6260212628"
              style={{ display: "inline-block", width: "300px", height: "600px" }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default PageLayout;

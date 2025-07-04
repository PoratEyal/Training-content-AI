import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useLanguage } from "../../../i18n/useLanguage";
import { getContent, getTitle } from "../../../models/resources/helmet";
import { WEBSITE_URL } from "../../../models/constants";
import { HelmetPage } from "../../../models/types/common";
import { ProductType } from "../../../context/ProductType";
import { logEvent } from "../../../utils/logEvent";
import Header from "../Header/Header";
import PracticeNavigationBar from "../NavigationBar/PracticeNavigationBar";
import YouthNavigationBar from "../NavigationBar/YouthNavigationBar";
import AdsSmall from "../../ads/AdsSmall/AdsSmall";
import AdsBig from "../../ads/AdsBig/AdsBig";
import styles from "./PageLayout.module.css";

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
  const { lang, dir } = useLanguage();
  const location = useLocation();

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
          backgroundColor: hasGreenBackground
            ? productType === ProductType.Youth
              ? "var(--primary-color)"
              : "var(--practice-primary-color)"
            : "var(--background-color)",
          direction: dir,
        }}
      >

        {hasHeader ? (
          <Header
            goBack={hasHeader.goBack}
            isBlur={hasHeader.isBlur}
            hasTitle={hasHeader.hasTitle}
          />
        ) : null}

        {children}

        {hasAds !== "" ? (() => {

          const path = location.pathname;
          const showAd = path.includes("/he/youth/activity");
          const auth = getAuth();
          const user = auth.currentUser;
          const userEmail = user?.email || "";

          if (productType === ProductType.Youth && showAd) {
            const banners = ["/practiceBanner1.png", "/practiceBanner2.png", "/practiceBanner3.png", "/practiceBanner4.png"];
            const randomIndex = Math.floor(Math.random() * banners.length);
            const bannerImage = banners[randomIndex];

            const handleBannerClick = () => {
              logEvent(bannerImage, userEmail);
            };

            return (
              <div className={styles.customAdSlot}>
                <a
                  href="https://activitywiz.com/practice"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleBannerClick}
                >
                  <img src={bannerImage} alt="ActivityWiz Practice" className={styles.customAdImage} />
                </a>
              </div>
            );
          }

          return <AdsSmall slot={hasAds} />;  // Google Ad
        })() : null}


        {hasNavBar ? (
          productType === ProductType.Practice ? (
            <PracticeNavigationBar />
          ) : (
            <YouthNavigationBar />
          )
        ) : null}
      </section>
    </>
  );
}

export default PageLayout;

import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import styles from "./PageLayout.module.css";
import Header from "../Header/Header";
import YouthNavigationBar from "../NavigationBar/YouthNavigationBar";
import PracticeNavigationBar from "../NavigationBar/PracticeNavigationBar";
import { WEBSITE_URL } from "../../../models/constants";
import AdsSmall from "../../ads/AdsSmall/AdsSmall";
import { HelmetPage } from "../../../models/types/common";
import { getContent, getTitle } from "../../../models/resources/helmet";
import { useLanguage } from "../../../i18n/useLanguage";

type PageLayoutProps = {
  id: HelmetPage;
  projectType: "practice" | "youth";
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
  projectType,
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
  const canonicalUrl = `${WEBSITE_URL}${location.pathname}`;

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
        className={styles.page_container}
        style={{
          backgroundColor: hasGreenBackground ? "#708254" : "#FAF6EE",
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

        {hasAds !== "" ? <AdsSmall slot={hasAds} /> : null}
        {hasNavBar ? (
          projectType === "practice" ? (
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

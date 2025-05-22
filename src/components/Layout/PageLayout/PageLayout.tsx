import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import styles from "./PageLayout.module.css";
import Header from "../Header/Header";
import UnderBar from "../UnderBar/UnderBar";
import { WEBSITE_URL } from "../../../models/constants";
import AdsSmall from "../../ads/AdsSmall/AdsSmall";
import { HelmetPage } from "../../../models/types/common";
import { getContent, getTitle } from "../../../models/resources/helmet";
import { useLanguage } from "../../../i18n/useLanguage";

type PageLayoutProps = {
    id: HelmetPage;
    path: string;
    hasGreenBackground?: boolean;
    hasHeader?:
        | {
              goBack?: () => void;
              isBlur?: boolean;
              hasTitle?: string;
          }
        | undefined;
    hesAds?: string;
    hasNavBar?: boolean;
    index?: boolean;
    children: React.ReactNode;
    title?: string;
};

function PageLayout({
    id,
    path,
    children,
    hasGreenBackground = false,
    hasHeader = undefined,
    hesAds = "",
    hasNavBar = false,
    index = true,
    title = "",
}: PageLayoutProps) {
    const { lang, dir } = useLanguage();
    const location = useLocation();
    const canonicalUrl = `${WEBSITE_URL}${location.pathname}`;
    return (
        <>
            <Helmet>
                <title>{getTitle(id, lang, title)}</title>
                <meta name="description" content={getContent(id, lang, title)} />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    key="robots"
                    name="robots"
                    content={index ? "index, follow" : "noindex, follow"}
                />
                <html lang={lang} dir={dir} />
                {index && (
                  <>
                    <link rel="alternate" href={`${WEBSITE_URL}/`} hrefLang="he" />
                    <link rel="alternate" href={`${WEBSITE_URL}/en`} hrefLang="en" />
                  </>
                )}
            </Helmet>

            <section
                className={styles.page_container}
                style={{ backgroundColor: hasGreenBackground ? "#708254" : "#FAF6EE", direction: dir }}
            >
                {hasHeader ? (
                    <Header
                        goBack={hasHeader.goBack}
                        isBlur={hasHeader.isBlur}
                        hasTitle={hasHeader.hasTitle}
                    />
                ) : null}

                {children}

                {hesAds != "" ? <AdsSmall slot={hesAds} /> : null}
                {hasNavBar ? <UnderBar /> : null}
            </section>
        </>
    );
}

export default PageLayout;

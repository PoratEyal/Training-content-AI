import React from "react";
import { Helmet } from "react-helmet-async";
import styles from "./PageLayout.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UnderBar from "../UnderBar/UnderBar";
import { WEBSITE_URL } from "../../../models/constants";
import AdsSmall from "../../ads/AdsSmall/AdsSmall";
import { useTranslation } from "react-i18next";
import { HelmetPage } from "../../../models/types/common";
import { getContent, getTitle } from "../../../models/resources/helmet";

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
    hasFooter?: boolean;
    hesAds?: string;
    hasNavBar?: boolean;
    index?: boolean;
    children: React.ReactNode;
    showAbout?: boolean;
    showPrivacyAndContact?: boolean;
    title?: string;
};

function PageLayout({
    id,
    path,
    children,
    hasGreenBackground = false,
    hasHeader = undefined,
    hasFooter = false,
    hesAds = "",
    hasNavBar = false,
    index = true,
    showAbout = true,
    showPrivacyAndContact = true,
    title = "",
}: PageLayoutProps) {
    const { i18n } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{getTitle(id, i18n.language, title)}</title>
                <meta name="description" content={getContent(id, i18n.language, title)} />
                <link rel="canonical" href={`${WEBSITE_URL}${path}`} />
                <meta
                    key="robots"
                    name="robots"
                    content={index ? "index, follow" : "noindex, follow"}
                />
            </Helmet>

            <section
                className={styles.page_container}
                style={{ backgroundColor: hasGreenBackground ? "#708254" : "#FAF6EE" }}
            >
                {hasHeader ? (
                    <Header
                        goBack={hasHeader.goBack}
                        isBlur={hasHeader.isBlur}
                        hasTitle={hasHeader.hasTitle}
                    />
                ) : null}

                {children}

                {hasFooter ? (
                    <Footer showAbout={showAbout} showPrivacyAndContact={showPrivacyAndContact} />
                ) : null}
                {hesAds != "" ? <AdsSmall slot={hesAds} /> : null}
                {hasNavBar ? <UnderBar /> : null}
            </section>
        </>
    );
}

export default PageLayout;

import React from "react";
import { Helmet } from "react-helmet-async";
import styles from "./PageLayout.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UnderBar from "../UnderBar/UnderBar";
import { WEBSITE_URL } from "../../../models/constants";
import AdsSmall from "../../ads/AdsSmall/AdsSmall";

type PageLayoutProps = {
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
    content?: string;
    title?: string;
    index?: boolean;
    children: React.ReactNode;
    showAbout?: boolean;
    showPrivacyAndContact?: boolean;
};

function PageLayout({
    path,
    children,
    hasGreenBackground = false,
    hasHeader = undefined,
    hasFooter = false,
    hesAds = "",
    hasNavBar = false,
    content = "",
    title = "",
    index = true,
    showAbout = true,
    showPrivacyAndContact = true,
}: PageLayoutProps) {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={content} />
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

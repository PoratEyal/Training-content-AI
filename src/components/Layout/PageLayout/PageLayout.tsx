import React from "react";
import { Helmet } from "react-helmet-async";
import styles from "./PageLayout.module.css";
import FadeEffect from "../../FadeEffect/FadeEffect";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UnderBar from "../../UnderBar/UnderBar";
import { WEBSITE_URL } from "../../../models/constants";
import AdsSmall from "../../ads/AdsSmall/AdsSmall";


type PageLayoutProps = {
    path: string;
    hasGreenBackground?: boolean;
    hasHeader?:
        | {
              goBack?: () => void;
              isBlur?: boolean;
          }
        | undefined;
    hasFooter?: boolean;
    hesAds?: boolean;
    hasNavBar?: boolean;
    content?: string;
    title?: string;
    noIndex?: boolean;
    children: React.ReactNode;
};

function PageLayout({
    path,
    children,
    hasGreenBackground = false,
    hasHeader = undefined,
    hasFooter = false,
    hesAds = false,
    hasNavBar = false,
    content = "",
    title = "",
    noIndex = false,
}: PageLayoutProps) {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={content} />
                <link rel="canonical" href={`${WEBSITE_URL}${path}`} />
                {noIndex ? <meta name="robots" content="noindex" /> : null}
            </Helmet>

            <section
                className={styles.page_container}
                style={{ backgroundColor: hasGreenBackground ? "#708254" : "#FAF6EE" }}
            >
                {hasHeader ? <Header goBack={hasHeader.goBack} isBlur={hasHeader.isBlur} /> : null}

                {children}
                {hasFooter ? <Footer /> : null}
                {hesAds ? <AdsSmall /> : null}
                {hasNavBar ? <UnderBar /> : null}
            </section>
        </>
    );
}

export default PageLayout;

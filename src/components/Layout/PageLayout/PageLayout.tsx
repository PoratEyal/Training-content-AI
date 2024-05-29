import React from "react";
import { Helmet } from "react-helmet-async";
import styles from "./PageLayout.module.css";
import FadeEffect from "../../FadeEffect/FadeEffect";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type PageLayoutProps = {
    path: string;
    hasGreenBackground?: boolean;
    hasHeader?:
        | {
              goBack?: () => void;
              isBlur?: boolean;
          }
        | undefined;
    hasFade?: boolean;
    hasFooter?: boolean;
    children: React.ReactNode;
};

function PageLayout({
    path,
    children,
    hasGreenBackground = false,
    hasHeader = undefined,
    hasFade = false,
    hasFooter = false,
}: PageLayoutProps) {
    return (
        <>
            <Helmet>
                <title>Activity Wiz - פעילויות</title>
                <meta
                    name="description"
                    content="צרו בקלות פעילויות מותאמות אישית תוך שימוש בבינה מלאכותית. מושלם לאירועי חברה, תנועות נוער, צופים, הנוער העובד, בני עקיבא ועוד. נסו עכשיו!"
                />
                <link rel="canonical" href={path} />
            </Helmet>

            <section
                className={styles.page_container}
                style={{ backgroundColor: hasGreenBackground ? "#708254" : "#FAF6EE" }}
            >
                <FadeEffect hasFade={hasFade}>
                    {hasHeader ? (
                        <Header goBack={hasHeader.goBack} isBlur={hasHeader.isBlur} />
                    ) : null}

                    {children}
                    {hasFooter ? <Footer /> : null}
                </FadeEffect>
            </section>
        </>
    );
}

export default PageLayout;

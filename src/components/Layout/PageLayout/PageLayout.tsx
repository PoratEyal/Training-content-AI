import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NOT_REGISTER_LIMIT } from "../../../models/constants";
import LimitRequest from "../../popups/LimitRequests/LimitRequests";
import TSCs from "../../popups/TSCs/TSCs";
import { forLongTime } from "../../../utils/time";
import { useAuthContext } from "../../../context/AuthContext";
import styles from "./PageLayout.module.css";
import BlurEffect from "../../BlurEffect/BlurEffect";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type PageLayoutProps = {
    path: string;
    hasGreenBackground?: boolean;
    hasHeader?:
        | {
              goBack?: () => void;
              isFade?: boolean;
          }
        | undefined;
    hasBlur?: boolean;
    hasFooter?: boolean;
    children: React.ReactNode;
};

function PageLayout({
    path,
    children,
    hasGreenBackground = false,
    hasHeader = undefined,
    hasBlur = false,
    hasFooter = false,
}: PageLayoutProps) {
    const { cookies, setCookie, unRegisterLimit } = useAuthContext();
    const [prevent, setPrevent] = useState(false);
    const [tscs, setTscs] = useState(false);

    useEffect(() => {
        if (unRegisterLimit >= NOT_REGISTER_LIMIT) {
            setPrevent(true);
        }
    }, [unRegisterLimit]);

    useEffect(() => {
        if (cookies["user-consent"] === undefined) {
            setTscs(true);
        }
    }, [cookies]);

    const handleAcceptTerms = () => {
        setCookie("user-consent", "accepted", {
            path: "/",
            expires: forLongTime,
        });
        setTscs(false);
    };

    const handleAcceptLimit = () => {
        setPrevent(false);
    };

    return (
        <>
            <Helmet>
                <title>בונה פעולות</title>
                <meta
                    name="description"
                    content="צור פעולות מרתקות ומותאמות אישית, על ידי הזנת פרטים על הקבוצה שלך, באמצעות כלי בינה מלאכותית."
                />
                <link rel="canonical" href={path} />
            </Helmet>
            {prevent ? <LimitRequest handleAccept={handleAcceptLimit} /> : null}
            {tscs ? <TSCs handleAccept={handleAcceptTerms} /> : null}

            <section
                className={styles.page_container}
                style={{ backgroundColor: hasGreenBackground ? "#708254" : "#FAF6EE" }}
            >
                <BlurEffect hasBlur={hasBlur}>
                    {hasHeader ? (
                        <Header goBack={hasHeader.goBack} isFade={hasHeader.isFade} />
                    ) : null}
                    {children}
                </BlurEffect>
                {hasFooter ? <Footer /> : null}
            </section>
        </>
    );
}

export default PageLayout;

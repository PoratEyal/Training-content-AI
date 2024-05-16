import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useContentContext } from "../../../context/ContentContext";
import { PROMPT_LIMIT } from "../../../models/constants/state";
import LimitRequest from "../../popups/LimitRequests/LimitRequests";
import TSCs from "../../popups/TSCs/TSCs";
import { forLongTime } from "../../../utils/time";
import { useAuthContext } from "../../../context/AuthContext";

type PageLayoutProps = {
    path: string;
    children: React.ReactNode;
};

function PageLayout({ path, children }: PageLayoutProps) {
    const { cookies, setCookie, unRegisterLimit } = useAuthContext();
    const [prevent, setPrevent] = useState(false);
    const [tscs, setTscs] = useState(false);

    useEffect(() => {
        if (unRegisterLimit >= PROMPT_LIMIT) {
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
            {children}
        </>
    );
}

export default PageLayout;

import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import TSCs from "../components/TSCs/TSCs";
import { useCookiesContext } from "../context/CookiesContext";

const PrivateRoutes = () => {
    const { cookieUserConsent, setConsentCookie } = useCookiesContext();
    const [tscs, setTscs] = useState(false);

    useEffect(() => {
        if (cookieUserConsent === undefined) {
            setTscs(true);
        }
    }, [cookieUserConsent]);

    const handleAcceptTerms = () => {
        setConsentCookie();
        setTscs(false);
    };

    return (
        <React.Fragment>
            {tscs ? <TSCs handleAccept={handleAcceptTerms} /> : null}
            <Outlet />
        </React.Fragment>
    );
};

export default PrivateRoutes;

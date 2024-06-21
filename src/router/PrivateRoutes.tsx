import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import TSCs from "../components/popups/TSCs/TSCs";
import { COOKIE_USER_CONSENT } from "../models/constants/cookie";
import Survey from "../components/popups/Survey/Survey";

const PrivateRoutes = () => {
    const { cookies, setConsentCookie } = useAuthContext();
    const [tscs, setTscs] = useState(false);

    useEffect(() => {
        if (cookies[COOKIE_USER_CONSENT] === undefined) {
            setTscs(true);
        }
    }, [cookies]);

    const handleAcceptTerms = () => {
        setConsentCookie();
        setTscs(false);
    };

    return (
        <React.Fragment>
            <Survey />
            {tscs ? <TSCs handleAccept={handleAcceptTerms} /> : null}
            <Outlet />
        </React.Fragment>
    );
};

export default PrivateRoutes;

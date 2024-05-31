import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import LimitRequest from "../components/popups/LimitRequests/LimitRequests";
import TSCs from "../components/popups/TSCs/TSCs";
import { COOKIE_USER_CONSENT } from "../models/constants/cookie";

const PrivateRoutes = () => {
    const { cookies, setConsentCookie, reachLimit, setReachLimit } = useAuthContext();
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

    const handleCloseLimit = () => {
        setReachLimit(false);
    };

    return (
        <React.Fragment>
            {reachLimit ? <LimitRequest handleClose={handleCloseLimit} /> : null}
            {tscs ? <TSCs handleAccept={handleAcceptTerms} /> : null}
            <Outlet />
        </React.Fragment>
    );
};

export default PrivateRoutes;

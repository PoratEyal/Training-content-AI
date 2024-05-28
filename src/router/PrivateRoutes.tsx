import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import LimitRequest from "../components/popups/LimitRequests/LimitRequests";
import TSCs from "../components/popups/TSCs/TSCs";
import { COOKIE_USER_CONSENT, LIMIT_VALUE } from "../models/constants/cookie";

const PrivateRoutes = () => {
    const { cookies, setConsentCookie, setLimitCookie, unRegisterLimit, reachUnRegisterLimit } =
        useAuthContext();
    const [prevent, setPrevent] = useState(false);
    const [tscs, setTscs] = useState(false);

    useEffect(() => {
        setPrevent(reachUnRegisterLimit());
    }, [unRegisterLimit]);

    useEffect(() => {
        if (cookies[COOKIE_USER_CONSENT] === undefined) {
            setTscs(true);
        }
    }, [cookies]);

    const handleAcceptTerms = () => {
        setConsentCookie();
        setTscs(false);
    };

    const handleAcceptLimit = () => {
        setLimitCookie(LIMIT_VALUE);
        setPrevent(false);
    };

    return (
        <React.Fragment>
            {prevent ? <LimitRequest handleAccept={handleAcceptLimit} /> : null}
            {tscs ? <TSCs handleAccept={handleAcceptTerms} /> : null}
            <Outlet />
        </React.Fragment>
    );
};

export default PrivateRoutes;

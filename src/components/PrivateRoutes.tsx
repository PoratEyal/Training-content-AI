import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LimitRequest from "./popups/LimitRequests/LimitRequests";
import TSCs from "./popups/TSCs/TSCs";
import { NOT_REGISTER_LIMIT } from "../models/constants";
import { useAuthContext } from "../context/AuthContext";
import { forLongTime } from "../utils/time";

const PrivateRoutes = () => {
    const location = useLocation();
    const { cookies, setCookie, unRegisterLimit } = useAuthContext();
    const { isLoggedIn, loading } = useAuthContext();
    const [block, setBlock] = useState(false);
    const [tscs, setTscs] = useState(false);

    useEffect(() => {
        if(location.pathname === "/home") return;
        if (loading || isLoggedIn) return;
        if (unRegisterLimit >= NOT_REGISTER_LIMIT + 1) {
            setBlock(true);
        }
    }, [unRegisterLimit]);

    useEffect(() => {
        if (cookies["user-consent"] === undefined) {
            setTscs(true);
        }
    }, [cookies]);

    const handleAcceptTerms = () => {
        setCookie("user-consent", "accepted", {
            path: "/home",
            expires: forLongTime,
        });
        setTscs(false);
    };

    const handleAcceptLimit = () => {
        setBlock(false);
    };

    return (
        <React.Fragment>
            {block ? <LimitRequest handleAccept={handleAcceptLimit} /> : null}
            {tscs ? <TSCs handleAccept={handleAcceptTerms} /> : null}
            <Outlet />
        </React.Fragment>
    );
};

export default PrivateRoutes;

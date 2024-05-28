import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { NOT_REGISTER_LIMIT } from "../models/constants";
import { forLongTime } from "../utils/time";
import LimitRequest from "../components/popups/LimitRequests/LimitRequests";
import TSCs from "../components/popups/TSCs/TSCs";

const PrivateRoutes = () => {
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
        <React.Fragment>
            {prevent ? <LimitRequest handleAccept={handleAcceptLimit} /> : null}
            {tscs ? <TSCs handleAccept={handleAcceptTerms} /> : null}
            <Outlet />
        </React.Fragment>
    );
};

export default PrivateRoutes;

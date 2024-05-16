import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LimitRequest from "./popups/LimitRequests/LimitRequests";
import TSCs from "./popups/TSCs/TSCs";
import { PROMPT_LIMIT } from "../models/constants/state";
import { useAuthContext } from "../context/AuthContext";
import { forLongTime } from "../utils/time";

const PrivateRoutes = () => {
    const { cookies, setCookie, unRegisterLimit } = useAuthContext();
    const [block, setBlock] = useState(false);
    const [tscs, setTscs] = useState(false);

    useEffect(() => {
        if (unRegisterLimit >= PROMPT_LIMIT) {
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
            path: "/",
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

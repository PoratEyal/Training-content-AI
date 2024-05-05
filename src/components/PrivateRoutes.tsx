import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useContentContext } from "../context/ContentContext";
import LimitRequest from "./popups/LimitRequests/LimitRequests";
import TSCs from "./popups/TSCs/TSCs";
import { PROMPT_LIMIT } from "../models/constants/state";

const PrivateRoutes = () => {
    const { cookies, setCookie, limit } = useContentContext();
    const [prevent, setPrevent] = useState(false);
    const [tscs, setTscs] = useState(false);

    useEffect(() => {
        if (limit >= PROMPT_LIMIT) {
            setPrevent(true);
        } 
    }, [limit]);

    useEffect(() => {
        if (cookies["user-consent"] === undefined) {
            setTscs(true);
        }
    }, [cookies]);

    const handleAcceptTerms = () => {
        setCookie("user-consent", "accepted", {
            path: "/",
            expires: new Date().setHours(24, 0, 0, 0)
        });
        setTscs(false);
    };

    const handleAcceptLimit = () => {
        setPrevent(false);
    }

    return (
        <React.Fragment>
            {prevent ? <LimitRequest handleAccept={handleAcceptLimit} /> : null}
            {tscs ? <TSCs handleAccept={handleAcceptTerms} /> : null}
            <Outlet /> 
        </React.Fragment>
    );
};

export default PrivateRoutes;

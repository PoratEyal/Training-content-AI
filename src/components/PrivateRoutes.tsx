import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useContentContext } from "../context/ContentContext";
import LimitRequest from "./popups/limitRequests/limitRequests";
import { PROMPT_LIMIT } from "../models/constants/state";
import TSCs from "./popups/TSCs/TSCs";

const PrivateRoutes = () => {
    const { cookies, setCookie, limit } = useContentContext();
    const [prevent, setPrevent] = useState(-1);
    const [tscs, setTscs] = useState(false);

    useEffect(() => {
        if (limit !== PROMPT_LIMIT) {
            setPrevent(limit);
        } else {
            const cookieRes = cookies["limit"];
            setPrevent(cookieRes && cookieRes.limit !== undefined ? cookieRes.limit : -1);
        }
    }, [limit]);

    useEffect(() => {
        if (cookies["user-consent"] === undefined) {
            setTscs(true);
        }
    }, [cookies]);

    const handleAccept = () => {
        setCookie("user-consent", "accepted", {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6),
        });
        setTscs(false);
    };

    return (
        <React.Fragment>
            {prevent === 0 ? <LimitRequest /> : null}
            {tscs ? <TSCs handleAccept={handleAccept} /> : null}
            <Outlet /> 
        </React.Fragment>
    );
};

export default PrivateRoutes;
// return limit ? <Outlet /> : <Navigate to={"/"} />;

// return prevent === 0 ? (
//     <React.Fragment>
//         <LimitRequest />
//         <Outlet />
//     </React.Fragment>
// ) : (
//     <Outlet />
// );
